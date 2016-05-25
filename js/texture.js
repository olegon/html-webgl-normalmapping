function Texture (image) {
    this.image = image;
    this.glTexture = null;
}

Texture.prototype.send = function (gl) {
    this.glTexture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.bindTexture(gl.TEXTURE_2D, null);

    return this.glTexture;
};

Texture.prototype.bind = function (gl) {
    if (this.glTexture == null) {
        this.send(gl);
    }

    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
};

Texture.prototype.enable = function (gl, glTextureDest) {
    gl.activeTexture(glTextureDest);
    this.bind(gl);
};
