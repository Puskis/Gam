var Gam = Gam || {};
Gam.Repositories = Gam.Repositories || {};

Gam.Repositories.imageRepo = {
    images: [],
    
    add: function (id, src, imageWidth, imageHeight, frameWidth) {
        var image = new Image(imageWidth, imageHeight);
        image.id = id;
        image.src = src;
        image.frameWidth = frameWidth;
        this.images.push(image);
    },
    
    get: function(id) {
        for (var i = 0; i < this.images.length; i++) {
            if (this.images[i].id === id) {
                return this.images[i];
            }
        }
        return null;
    }
};