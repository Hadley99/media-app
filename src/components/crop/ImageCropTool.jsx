import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Cropper from "react-easy-crop";

import getCroppedImg from "./CropImage";

const ImageCropTool = ({
  tempImg,
  openDialog,
  toggleCropTool,
  setImageUrl,
  setFile,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const { file, url } = await getCroppedImg(tempImg, croppedAreaPixels);

      setFile(file);
      setImageUrl(url);
    } catch (e) {
      console.error(e, "caught error");
    }
  };

  return (
    <Dialog open={openDialog}>
      <DialogTitle>Crop Your Image</DialogTitle>
      <DialogContent
        dividers
        sx={{
          background: "#333",
          position: "relative",
          height: 400,
          width: "auto",
          minWidth: { sm: 500 },
        }}
      >
        {tempImg && (
          <Cropper
            style={{
              position: "static",
              "& first-child": { position: "static" },
            }}
            image={tempImg}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleCropTool} variant="outlined" color="primary">
          Close
        </Button>
        <Button
          onClick={() => {
            showCroppedImage();
            toggleCropTool();
          }}
          variant="contained"
          color="primary"
        >
          Crop
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropTool;
