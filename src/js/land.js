export default class Land {
    constructor(mesh, axes, type, status, landUpLeft, landUpRight, landLeft, landRight, landDownLeft, landDownRight) {
        this.mesh = mesh;
        this.axes = axes;
        this.type = type;
        this.status = status;
        this.landUpLeft = landUpLeft;
        this.landUpRight = landUpRight;
        this.landLeft = landLeft;
        this.landRight = landRight;
        this.landDownLeft = landDownLeft;
        this.landDownRight = landDownRight;
    }
}