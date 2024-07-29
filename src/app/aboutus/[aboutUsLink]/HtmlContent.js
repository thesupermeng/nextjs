export const HtmlContent = ({ content, onload, tw = '' }) => {
  return content ? (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={`w-full ${tw} text-justify`}
    ></div>
  ) : null;
};
