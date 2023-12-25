import React, { Component } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";

class PdfLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pdfDocument: null,
      error: null,
    };

    this.documentRef = React.createRef();
  }

  static defaultProps = {
    // workerSrc: "https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js",
  };

  componentDidMount() {
    this.load();
  }

  componentWillUnmount() {
    const { pdfDocument: discardedDocument } = this.state;
    if (discardedDocument) {
      discardedDocument.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.load();
    }
  }

  componentDidCatch(error, info) {
    const { onError } = this.props;

    if (onError) {
      onError(error);
    }

    this.setState({ pdfDocument: null, error });
  }

  load() {
    const { ownerDocument = document } = this.documentRef.current || {};
    const { url, cMapUrl, cMapPacked, onloadSuccess } = this.props;
    const { pdfDocument: discardedDocument } = this.state;
    this.setState({ pdfDocument: null, error: null });

    GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.js",
      import.meta.url,
    ).toString();

    Promise.resolve()
      .then(() => discardedDocument && discardedDocument.destroy())
      .then(() => {
        if (!url) {
          return;
        }

        return getDocument({
          ...this.props,
          ownerDocument,
          cMapUrl,
          cMapPacked,
        }).promise.then((pdfDocument) => {
          onloadSuccess && onloadSuccess(pdfDocument);
          this.setState({ pdfDocument });
        });
      })
      .catch((e) => this.componentDidCatch(e));
  }

  render() {
    const { children, beforeLoad } = this.props;
    const { pdfDocument, error } = this.state;
    return (
      <>
        <span ref={this.documentRef} />
        {error
          ? this.renderError()
          : !pdfDocument || !children
          ? beforeLoad
          : children(pdfDocument)}
      </>
    );
  }

  renderError() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return React.cloneElement(errorMessage, { error: this.state.error });
    }

    return null;
  }
}

export default PdfLoader;
