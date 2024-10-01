const { TMP_FOLDER, UPLOADS_FOLDER } = require("../configs/uploadConfig")
const path = require("path");
const fs = require("fs");

class UploadProvider {

  async createFile(file) {
    await fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(UPLOADS_FOLDER, file)
    );

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(UPLOADS_FOLDER, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return;
    }

    await fs.promises.unlink(filePath)
  }

}

module.exports = UploadProvider;
