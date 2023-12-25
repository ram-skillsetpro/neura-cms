import React from "react";

const updateHash = (highlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

const HighlightList = ({ highlights }) => {

  const handleDelete = async (e, commentId) => {
    e.stopPropagation();
    const parent = e.target.parentElement.closest("li");
    if (parent) {
      parent.style.opacity = "0.5";
    }
    if (commentId) {
      if (parent) {
        parent.style.opacity = "1";
      }
    }
  };

  return (
    <div className="sidebar" style={{ width: "25vw" }}>
      <ul className="sidebar__highlights">
        {Array.isArray(highlights) &&
          highlights.map((highlight, index) => (
            <li
              key={index}
              className="sidebar__highlight"
              onClick={() => {
                updateHash(highlight);
              }}
            >
              <div>
                <div className="msg-header">
                  <strong>{highlight.comment.text}</strong>
                  <button
                      onClick={(e) => handleDelete(e, highlight.commentId || 0)}
                      className={`button-red msg-delete-btn highlight-delete-btn`}
                    >
                      Trash
                    </button>
                </div>

                {highlight.content.text ? (
                  <blockquote style={{ marginTop: "0.5rem" }}>
                    {`${highlight.content.text.slice(0, 90).trim()}…`}
                  </blockquote>
                ) : null}
                {highlight.content.image ? (
                  <div className="highlight__image" style={{ marginTop: "0.5rem" }}>
                    <img src={highlight.content.image} alt={"Screenshot"} />
                  </div>
                ) : null}
              </div>
              <div className="highlight__location">Page {highlight.position.pageNumber}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HighlightList;
