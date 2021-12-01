export default class Land {
    constructor(mesh, coord, type, status, landUpLeftCoord, landUpRightCoord, landLeftCoord, landRightCoord, landDownLeftCoord, landDownRightCoord) {
        this.mesh = mesh;
        this.coord = coord;
        this.type = type;
        this.status = status;
        this.landUpLeftCoord = landUpLeftCoord;
        this.landUpRightCoord = landUpRightCoord;
        this.landLeftCoord = landLeftCoord;
        this.landRightCoord = landRightCoord;
        this.landDownLeftCoord = landDownLeftCoord;
        this.landDownRightCoord = landDownRightCoord;
    }
}