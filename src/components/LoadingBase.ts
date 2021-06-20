const LOADING_STATES = ["error", "loading", "success", "neutral"];

export default class LoadingBase extends HTMLElement {
  static get observedAttributes() {
    return ["data-loading"];
  }
  constructor() {
    super();
    let template = document.querySelector(
      "#loading-template"
    ) as HTMLTemplateElement;

    this.classList.add("loading-container");

    if (!template) {
      throw Error("No Template!");
    }

    this.appendChild(template.content.cloneNode(true));
    this.loadingState = "neutral";
    this.setAttribute("data-loading", "neutral");
  }

  set loadingState(val: string) {
    val = this.checkNewLoadingState(val);
    this.setNodeStates(val);
  }

  attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
    this.loadingState = newValue;
  }

  setNodeStates(newValue: string) {
    const stateNodes = Array.from(this.children);

    stateNodes.forEach((node) => {
      const wasChosen = node.getAttribute("data-loading") === newValue;
      node.classList[wasChosen ? "add" : "remove"]("visible");
    });
  }

  checkNewLoadingState(value: string) {
    if (!LOADING_STATES.includes(value)) {
      value = "neutral";
      console.warn(
        "Using unsupported value. Resseting loading state to 'neutral'"
      );
    }
    return value;
  }
}
