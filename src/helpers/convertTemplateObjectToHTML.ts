type Attrs = {
  [key: string]: string;
};

export type TemplateObject = {
  tag: string;
  attrs: Attrs;
  children?: string | TemplateObject[];
};

export default function convertTemplateObjectToHTML(
  templateObject: TemplateObject
): HTMLElement {
  const { tag, attrs, children } = templateObject;
  const element = createElement(tag);
  const elementWithAttrs = setAttrs(element, attrs);

  if (!children) {
    return elementWithAttrs;
  }

  const childElements = createChildelements(children);

  return appendChildElement(elementWithAttrs, childElements);
}

function createElement(name: string) {
  return document.createElement(name);
}

function createChildelements(
  children: string | TemplateObject[]
): string | HTMLElement[] {
  if (typeof children === "string") {
    return children;
  }

  return children.map((child) => convertTemplateObjectToHTML(child));
}

function appendChildElement(
  element: HTMLElement,
  children: string | HTMLElement[]
) {
  if (typeof children === "string") {
    element.textContent = children;
    return element;
  }

  children.forEach((child) => element.appendChild(child));
  return element;
}

function setAttrs(element: HTMLElement, attrs: Attrs) {
  for (const key in attrs) {
    if (Object.prototype.hasOwnProperty.call(attrs, key)) {
      const attr = attrs[key];
      element.setAttribute(key, attr);
    }
  }
  return element;
}
