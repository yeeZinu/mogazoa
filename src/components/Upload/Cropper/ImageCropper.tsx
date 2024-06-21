import { createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "@/components/Button/Button";
import cn from "@/utils/classNames";
import styles from "./ImageCropper.module.scss";

type ImageCropperProps = {
  image: string | null;
  onCrop: (croppedImage: Blob | null) => Promise<void>;
};

export default function ImageCropper({ image, onCrop }: ImageCropperProps) {
  const cropperRef = createRef<ReactCropperElement>();

  const handleCropClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const { cropper } = cropperRef.current;
      const canvas = cropper.getCroppedCanvas();
      if (canvas) {
        const newCanvas = document.createElement("canvas");
        const ctx = newCanvas.getContext("2d");
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;
        if (ctx) {
          ctx.fillStyle = "#f1f1f5";
          ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
          ctx.drawImage(canvas, 0, 0);
          newCanvas.toBlob((blob) => onCrop(blob));
        }
      }
    }
  };

  if (!image) return null;
  return (
    <section className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.cropperBox}>
          <Cropper
            ref={cropperRef}
            style={{ height: 300, width: 400 }}
            zoomTo={0.5}
            aspectRatio={1}
            preview='.img-preview'
            src={image}
            viewMode={0}
            background={false}
            dragMode='move'
            responsive
            autoCropArea={0.5}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={false}
          />
        </div>
        <div className={styles.bottomLayout}>
          <div className={styles.previewBox}>
            <h3 className={styles.text}>이미지 미리보기</h3>
            <div className={cn(styles.previewContainer)}>
              <div className={cn("img-preview", styles.previewImage)} />
            </div>
          </div>
          <Button
            className={styles.button}
            styleType='primary'
            onClick={handleCropClick}
          >
            적용하기
          </Button>
        </div>
      </div>
    </section>
  );
}
