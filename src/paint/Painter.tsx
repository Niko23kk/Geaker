import React, { useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { StaticValue } from "../staticValue";
import { Canvas } from "./components/Canvas";
import { Goo } from "./components/Goo";
import { Intro } from "./components/Intro";
import { Toolbar } from "./components/Toolbar";
import { usePainter } from "./hooks/usePainter";
import "./style.css";

export const Painter = () => {
  const params = useParams();
  const [dateUrl, setDataUrl] = useState("#");
  const [{ canvas, isReady, ...state }, { init, ...api }] = usePainter();

  function DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  const handleDownload = useCallback(() => {
    if (!canvas || !canvas.current) return;
    if (params.id != null) {
      // const data = new FormData();
      // data.append("uploadedFile", canvas.current.toDataURL("image/jpg"));
      // data.append("project",localStorage.project);
      // console.log(data);

      // const fd = new FormData();
      let status = 0;
      // console.log(canvas.current.toDataURL("image/jpeg"));
      // fetch(canvas.current.toDataURL("image/jpeg"))
      //   .then((res) => res.blob())
      //   .then((blob) => {
      //     console.log(blob);
      //     const file = new File([blob], "filename.jpeg");
      //     fd.append("uploadedFile", file);
      //     console.log(file);
      //     console.log(fd);
      //   });
      // console.log(fd);

      const file = DataURIToBlob(canvas.current.toDataURL("image/jpeg"));
      const data = new FormData();
      data.append("uploadedFile", file);
      data.append("project", params.id);

      fetch(`${StaticValue.BaseURL}api/addAnimationImage/${params.id}`, {
        method: "Post",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        body: data,
      })
        .then((res) => {
          status = res.status;
          return res.json();
        })
        .then((result) => {
          if (status === 200) {
            alert("Ok");
          } else if (status === 400) {
          }
          if (status === 401) {
            window.location.href = "/notAuthorize";
          }
          if (status === 403) {
            window.location.href = "/notAccess";
          }
          if (status === 404) {
            window.location.href = "/notFound";
          }
          if (status === 500) {
            window.location.href = "/internalServerError";
          }
        });
    }
    //setDataUrl(canvas.current.toDataURL("image/png"));
  }, [canvas]);

  const toolbarProps = { ...state, ...api, dateUrl, handleDownload };

  return (
    <div className="painter-body">
      <Intro isReady={isReady} init={init} />
      <Toolbar {...toolbarProps} />
      <Canvas width={state.currentWidth} canvasRef={canvas} />
      <Goo />
    </div>
  );
};
