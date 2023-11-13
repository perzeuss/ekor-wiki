import { ref } from "vue";
const state = reactive({
  sidebar: ref(""),
  content: ref(""),
  _cb1: ref((v) => {}),
  _cb2: ref((v) => {}),
  generating: ref(false),
});

export default function useCompletion() {
  function onCompleteSidebar(cb) {
    state._cb1.value = cb;
  }

  function onCompleteContent(cb) {
    state._cb2.value = cb;
  }

  const generate = async (query: string) => {
    state.generating = true;
    state.sidebar = "";
    state.content = "";
    await Promise.all(
      complete(state.sidebar, query, undefined, state._cb1.value),
      complete(state.content, query, "Detailseite", state._cb2.value)
    );
    state.generating = false;
  };

  async function complete(
    text: Ref,
    query: string,
    contenttype: string,
    cb: (v: string) => {}
  ) {
    const {
      public: { api },
    } = useRuntimeConfig();
    // TODO: move this to a proxy api endpoint
    const response = await fetch(`${api.basePath}/completion-messages`, {
      method: "POST", // Ensure the correct HTTP method is used
      body: JSON.stringify({
        inputs: { query, contenttype },
        response_mode: "streaming",
        user: "anonymous",
      }),
      headers: {
        "Content-Type": "application/json", // Specify the content type
        Authorization: `Bearer ${api.secret}`,
      },
    });

    // Check if the response is OK and readable
    if (response.ok && response.body) {
      const reader = response.body.getReader();

      // Read the stream
      const stream = new ReadableStream({
        async start(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            controller.enqueue(value);

            // Process each chunk of data as it's received
            const chunkTexts = new TextDecoder()
              .decode(value, { stream: true })
              .split(/\n/);
            for (const chunk of chunkTexts.filter(Boolean)) {
              if (chunk.startsWith("data: ")) {
                try {
                  const data = JSON.parse(chunk.substring(6));
                  text += data.answer; // Append the answer to the text ref
                  cb(text);
                } catch (e) {
                  console.error(
                    "Error parsing JSON:",
                    e,
                    chunk,
                    chunk.substring(6)
                  );
                }
              }
            }
          }
          controller.close();
          reader.releaseLock();
        },
      });
    }
  }

  return {
    generate,
    onCompleteContent,
    onCompleteSidebar,
    isGenerating: state.generating,
  };
}

export { useCompletion };
