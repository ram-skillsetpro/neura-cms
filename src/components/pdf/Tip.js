import { Component } from "react";
import "../pdf/style/tip.scss";

class Tip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compact: true,
      text: "",
      emoji: "",
    };
  }

  componentDidUpdate(nextProps, nextState) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  render() {
    const { onConfirm, onOpen } = this.props;
    const { compact, text, emoji } = this.state;

    return (
      <div className="Tip">
        {compact ? (
          <div
            className="Tip__compact"
            onClick={() => {
              onOpen();
              this.setState({ compact: false });
            }}
          >
            Add Comment
          </div>
        ) : (
          <form
            className="Tip__card"
            onSubmit={(event) => {
              event.preventDefault();
              onConfirm({ text, emoji });
            }}
          >
            <div>
              <textarea
                style={{ width: "97%" }}
                placeholder="Your comment"
                autoFocus
                value={text}
                onChange={(event) => this.setState({ text: event.target.value })}
                ref={(node) => {
                  if (node) {
                    node.focus();
                  }
                }}
              />
              {/* <div>
                {["💩", "😱", "😍", "🔥", "😳", "⚠️"].map((_emoji) => (
                  <label key={_emoji}>
                    <input
                      checked={emoji === _emoji}
                      type="radio"
                      name="emoji"
                      value={_emoji}
                      onChange={(event) => this.setState({ emoji: event.target.value })}
                    />
                    {_emoji}
                  </label>
                ))}
              </div> */}
            </div>
            <div>
              <input type="submit" value="Save" />
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Tip;
