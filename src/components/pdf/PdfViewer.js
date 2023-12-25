import React, { useEffect, useRef, useState } from 'react';
import PdfLoader from './PdfLoader';
import Tip from './Tip';
import {
  PdfHighlighter,
  Highlight,
  AreaHighlight,
  Popup,
} from 'react-pdf-highlighter';
import { base64toBlob } from '../../utils/utility';
import { useLocation } from "react-router";
import HighlightList from './highlights-list';
import "./style/pdf-viewer.scss";
import { Button, Dialog, DialogActions } from '@mui/material';

const PdfSpinner = () => <div>Loading...</div>;
const HighlightPopup = ({ comment }) => (
  <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid black' }}>
    {comment}
  </div>
);
const getNextId = () => String(Math.random()).slice(2);
const parseIdFromHash = () => document.location.hash.slice("#highlight-".length);
const resetHash = () => {
  document.location.hash = "";
};


const PdfViewer = ({ file, fileId }) => {
    const [pdf, setPdf] = useState('');
    const [highlights, setHighlights] = useState([]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfDocument, setPdfDocument] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const canvasRef = useRef(null);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [toggleHighlight, setToggleHighlight] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
    const [currentSearchObject, setCurrentSearchObject] = useState({});
    const [reset, setReset] = useState(false);
    const { hash } = useLocation();

    const consoleRef = useRef(window.console.log);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scrollViewerTo = useRef((highlight) => {});

  const resetHighlights = () => {
    setHighlights([]);
  };

  const scrollToHighlightFromHash = () => {
    const highlight = getHighlightById(parseIdFromHash());
    if (highlight) {
      scrollViewerTo.current(highlight);
    }
  };

  useEffect(() => {
    scrollToHighlightFromHash();
  }, [hash]);

  const getHighlightById = (id) => {
    return highlights.find((highlight) => highlight.id === id);
  };

  const addHighlight = (highlight) => {
    const obj = { ...highlight, id: getNextId() };
    setHighlights([obj, ...highlights]);
  };

  const updateHighlight = (highlightId, position, content) => {
    setHighlights(
      highlights.map((h) => {
        const { id, position: originalPosition, content: originalContent, ...rest } = h;
        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest,
            }
          : h;
      }),
    );
  };
  
  const onPdfLoaded = (pdf) => {
    totalPageRef.current = pdf.numPages;
    setPdfDocument(pdf);
  };


  useEffect(() => {
    scrollToHighlightFromHash();
  }, [hash]);


  useEffect(() => {
    const el = document.querySelector(".original");
    const pdfContainerWidth = el?.clientWidth;
    const pdfContainerHeight = el?.clientHeight;
    setHeight(pdfContainerHeight || 600);
    setWidth(pdfContainerWidth || 1000);

    window.addEventListener("resize", () => {
      const pdfContainerWidth = el?.clientWidth;
      const pdfContainerHeight = el?.clientHeight;
      setHeight(pdfContainerHeight || 600);
      setWidth(pdfContainerWidth || 1000);
    });
  }, []);

  const hasPdfLoaded = useRef(false);
  const pdfContanerEl = null;
  const totalPageRef = useRef(0);

  const handleScroll = (pdfContanerEl) => {
    pdfContanerEl &&
      pdfContanerEl.addEventListener("scroll", () => {
        const { scrollTop, scrollHeight, clientHeight } = pdfContanerEl;
        const maxPage = totalPageRef.current || 1;
        const newPageNumber = Math.min(
          maxPage,
          Math.ceil((scrollTop / (scrollHeight - clientHeight)) * maxPage),
        );
        setPageNumber(newPageNumber);
      });
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        const pdfContanerEl = document.querySelector(".PdfHighlighter");

        if (pdfContanerEl && !hasPdfLoaded.current) {
          clearInterval(interval);

          hasPdfLoaded.current = true;
          handleScroll(pdfContanerEl);
        }
      },
      1000,
      [pdfContanerEl],
    );

    return () => {
      clearInterval(interval);
      hasPdfLoaded.current = false;
    };
  }, []);

  const rotatePdf = async () => {
    if (pdfDocument) {
      setIsOpen(true);
      const rotation = (rotationAngle + 90) % 360;
      setRotationAngle(rotation);
      const page = await pdfDocument.getPage(pageNumber || 1);
      const viewport = page.getViewport({ scale: 4, rotation });
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        const renderTask = page.render(renderContext);
        await renderTask.promise;
      } else {
        rotatePdf();
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchActive(true);
      searchPdf(searchTerm);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resetPdfSearch = () => {
    setSearchActive(false);
    setSearchTerm("");
    setPdf(base64toBlob(file));
    setPageNumber(1);
    setTimeout(() => {
      const pdfContanerEl = document.querySelector(".PdfHighlighter");
      handleScroll(pdfContanerEl);
    }, 1000);
  };

  const textHighlighter = async (searchText) => {
    try {
      if (searchText !== "") {
        // Find all elements with class "textLayer" that are not already highlighted
        const textList = document.querySelectorAll(".textLayer:not(.highlighted)");
        textList.forEach((el) => {
          const text = el.innerHTML;
          const re = new RegExp(searchText, "gi"); // search for all instances
          const newText = text.replace(re, `<span class="text-highlight">${searchText}</span>`);
          el.innerHTML = newText;

          // Add a class to mark the element as highlighted
          el.classList.add("highlighted");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchPdf = async (searchTerm) => {
    try {
      if (pdfDocument && searchTerm) {
        textHighlighter(searchTerm);
        const searchResults = [];
        for (let pageIndex = 0; pageIndex < totalPageRef.current; pageIndex++) {
          const page = await pdfDocument.getPage(pageIndex + 1); // Page numbers start from 1
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join("");
          const re = new RegExp(searchTerm, "gi");
          const matches = [...pageText.matchAll(re)];
          if (matches.length > 0) {
            searchResults.push({
              page: pageIndex + 1,
              matches,
            });
          }
        }
        const mappedSearchResults = [];
        searchResults.forEach((data) => {
          data.matches.forEach((match, index) => {
            mappedSearchResults.push({ page: data.page, match: match[0], index });
          });
        });

        setSearchResults(mappedSearchResults);
        if (mappedSearchResults.length > 0) {
          setCurrentSearchIndex(1);
          const searchObject = searchResults[0];

          (window).PdfViewer.viewer.scrollPageIntoView({ pageNumber: searchObject.page });

          setTimeout(() => {
            textHighlighter(searchTerm);
          }, 100);

          // scrollOnPage(searchObject.page);
          setTimeout(() => {
            const totalSearch = document.querySelectorAll(
              `.page[data-page-number="${searchObject.page}"] .text-highlight`,
            );
            console.log(totalSearch);
            if (totalSearch[0]) {
              totalSearch[0].scrollIntoView({ block: "center" });
            }
          }, 500);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchNext = () => {
    if (currentSearchIndex >= searchResults.length) {
      return;
    }

    const currentIndex = currentSearchIndex + 1;
    const searchObject = searchResults[currentIndex - 1];

    // scrollOnPage(searchObject.page);
    setCurrentSearchIndex(currentIndex);
    setCurrentSearchObject(searchObject);
    searchObject.page !== pageNumber &&
      (window).PdfViewer.viewer.scrollPageIntoView({ pageNumber: searchObject.page });
  };

  const handleSearchPrev = () => {
    if (currentSearchIndex <= 1) {
      return;
    }

    const currentIndex = currentSearchIndex - 1;
    const searchObject = searchResults[currentIndex - 1];

    setCurrentSearchIndex(currentIndex);
    setCurrentSearchObject(searchObject);

    searchObject.page !== pageNumber &&
      (window).PdfViewer.viewer.scrollPageIntoView({ pageNumber: searchObject.page });
    if (searchObject.page === 1) {
      setPageNumber(1);
    }
  };

  useEffect(() => {
    if (totalPageRef.current) {
      setTimeout(() => {
        textHighlighter(searchTerm);

        if (currentSearchObject) {
          const totalSearch = document.querySelectorAll(
            `.page[data-page-number="${currentSearchObject.page}"] .text-highlight`,
          );
          const index = currentSearchObject.index;

          if (totalSearch[index]) {
            // const totalSearchList = document.querySelectorAll(`.text-highlight`);
            // if (totalSearchList) {
            //   totalSearchList.forEach((el) => {
            //     (el as HTMLElement).style.background = "#fcff34";
            //   });
            // }
            // (totalSearch[index] as HTMLElement).style.background = "#f6d273";
            totalSearch[index].scrollIntoView({ block: "center" });
          }
        }
      }, 200);
    }
  }, [currentSearchObject, totalPageRef.current]);

  useEffect(() => {
    if (Array.isArray(highlights) && highlights.length > 0) {
      setToggleHighlight(true);
    } else {
      setToggleHighlight(false);
    }
  }, [highlights]);

  useEffect(() => {
    setPdf(base64toBlob(file));
  }, [file]);

  return (
    <>
      <div className="App" style={{ display: "flex", height: `${height}px`, width: `${width}px` }}>

          {/* <div style={{ height: "97vh", display: "flex", justifyContent: "center" }}>
            <canvas ref={canvasRef}></canvas>
          </div> */}
        {toggleHighlight && (
          <HighlightList
            highlights={highlights}
            resetHighlights={resetHighlights}
          />
        )}
        <div
          style={{
            height: `${height}px`,
            width: `${width}px`,
            position: "relative",
          }}
        >
          <div className="pdf-toolbar">
            <div className="custom-search-container">
              <form onSubmit={handleSearch}>
                <input
                  readOnly={searchActive}
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
              {searchActive ? (
                <div onClick={resetPdfSearch} title="Clear Search">
                  <button className={`button-red msg-delete-btn search-btn`}>
                    Close
                  </button>
                </div>
              ) : (
                <button onClick={handleSearch} className={`button-red msg-delete-btn search-btn`}>
                  Search
                </button>
              )}
            </div>
            {searchActive && (
              <>
                <div title="Prev">
                  <button
                    onClick={handleSearchPrev}
                    className={`button-red msg-delete-btn pdf-rotate-btn next-prev-btn`}
                  >
                    Up
                  </button>
                </div>
                <div className="search-pager">
                  {searchResults.length > 0 ? currentSearchIndex : 0}/{searchResults.length}
                </div>
                <div title="Next">
                  <button
                    onClick={handleSearchNext}
                    className={`button-red msg-delete-btn pdf-rotate-btn next-prev-btn`}
                  >
                    Down
                  </button>
                </div>
              </>
            )}
            <div onClick={rotatePdf} title="Rotate Page">
              <button className={`button-red msg-delete-btn pdf-rotate-btn`}>
                Rotate
              </button>
            </div>
            {highlights.length > 0 && (
              <div onClick={() => setToggleHighlight(!toggleHighlight)} title="Toggle Highlight">
                <button className={`button-red msg-delete-btn pdf-rotate-btn`}>
                  Toggle
                </button>
              </div>
            )}
          </div>

          <PdfLoader url={pdf} beforeLoad={<PdfSpinner />} onloadSuccess={onPdfLoaded}>
            {(pdfDocument) => {
              return (
                <PdfHighlighter
                  pdfDocument={pdfDocument}
                  enableAreaSelection={(event) => event.altKey}
                  onScrollChange={() => {
                    resetHash();
                  }}
                  pdfScaleValue="page-width"
                  scrollRef={(scrollTo) => {
                    scrollViewerTo.current = scrollTo;
                    scrollToHighlightFromHash();
                  }}
                  onSelectionFinished={(
                    position,
                    content,
                    hideTipAndSelection,
                    transformSelection,
                  ) => (
                    <Tip
                      onOpen={transformSelection}
                      onConfirm={(comment) => {
                        addHighlight({ content, position, comment });
                        hideTipAndSelection();
                      }}
                    />
                  )}
                  highlightTransform={(
                    highlight,
                    index,
                    setTip,
                    hideTip,
                    viewportToScaled,
                    screenshot,
                    isScrolledTo,
                  ) => {
                    const isTextHighlight = !(highlight.content && highlight.content.image);

                    const component = isTextHighlight ? (
                      <Highlight
                        isScrolledTo={isScrolledTo}
                        position={highlight.position}
                        comment={highlight.comment}
                      />
                    ) : (
                      <AreaHighlight
                        isScrolledTo={isScrolledTo}
                        highlight={highlight}
                        onChange={(boundingRect) => {
                          updateHighlight(
                            highlight.id,
                            { boundingRect: viewportToScaled(boundingRect) },
                            { image: screenshot(boundingRect) },
                          );
                        }}
                      />
                    );

                    return (
                      <Popup
                        popupContent={<HighlightPopup {...highlight} />}
                        onMouseOver={(popupContent) => {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          return setTip(highlight, (highlight) => popupContent);
                        }}
                        onMouseOut={hideTip}
                        key={index}
                      >
                        {component}
                      </Popup>
                    );
                  }}
                  highlights={highlights}
                />
              );
            }}
          </PdfLoader>
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => { setIsOpen(false)}}>
        <div style={{ height: "97vh", display: "flex", justifyContent: "center" }}>
          <canvas ref={canvasRef}></canvas>
        </div>
        <DialogActions>
          <Button onClick={rotatePdf}>Rotate</Button>
          <Button variant="contained" onClick={() => { setIsOpen(false)}}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PdfViewer;
