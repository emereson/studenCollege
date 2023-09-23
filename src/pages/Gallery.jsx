import axios from "axios";
import React, { useEffect, useState } from "react";
import "./pagesStyle/gallery.css";

const Gallery = () => {
  const [gallery, setgallery] = useState();
  const [viewImg, setviewImg] = useState();
  const [indexImg, setindexImg] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}accessStudent/gallery`;

    axios
      .get(url)
      .then((res) => {
        setgallery(res.data?.galeryPhotos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="gallery__container">
      {gallery?.map((photo) => (
        <section key={photo.id}>
          <h2>{photo.name}</h2>
          <article>
            {photo.galeryPhotosImgs.map((img, index) => (
              <div
                style={{
                  ...(index % 5 === 0
                    ? { gridColumn: "auto", gridRow: "span 2 " }
                    : {}),
                }}
                key={img.id}
              >
                <img
                  onClick={() => {
                    setviewImg(photo.id), setindexImg(index);
                  }}
                  style={{
                    objectFit: "cover",
                  }}
                  src={img.galleryImgUrl}
                  alt=""
                />
                {viewImg === photo.id ? (
                  <div className="gallery__viewImg">
                    <i
                      onClick={() => {
                        setviewImg(false);
                      }}
                      className="bx bxs-x-circle"
                    ></i>
                    <article>
                      <i
                        class="bx bx-chevron-left"
                        onClick={() =>
                          setindexImg(
                            indexImg > 0
                              ? indexImg - 1
                              : photo.galeryPhotosImgs.length - 1
                          )
                        }
                      ></i>
                      <div>
                        <img
                          src={img?.galleryImgUrl}
                          alt=""
                          style={
                            index === indexImg
                              ? { opacity: "1", transform: "translateX(0)" }
                              : { opacity: "0", transform: "translateX(100%)" }
                          }
                        />
                      </div>
                      <i
                        class="bx bx-chevron-right"
                        onClick={() =>
                          setindexImg(
                            indexImg < photo.galeryPhotosImgs.length - 1
                              ? indexImg + 1
                              : 0
                          )
                        }
                      ></i>
                    </article>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </article>
        </section>
      ))}
    </div>
  );
};

export default Gallery;
