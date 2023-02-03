export const toolbarIcons = state => ([
    {
        isPropUpdated: state?.fontWeight === "bold",
        path: `<path data-id="bold" data-type="btn-icon" d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>`,
        get isActive() {
            return this.isPropUpdated;
        },
        get value() {
            const self = this;
            return {
                get fontWeight() {
                    return self.isPropUpdated ? "normal" : "bold";
                }
            };
        }
    },
    {
        isPropUpdated: state?.fontStyle === "italic",
        path: `<path data-id="italic" data-type="btn-icon" d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>`,
        get isActive() {
            return this.isPropUpdated;
        },
        get value() {
            const self = this;
            return {
                get fontStyle() {
                    return self.isPropUpdated ? "normal" : "italic";
                }
            };
        }
    },
    {
        isPropUpdated: state?.textDecoration === "underline",
        path: `<path data-id="underline" data-type="btn-icon" d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/>`,
        get isActive() {
            return this.isPropUpdated;
        },
        get value() {
            const self = this;
            return {
                get textDecoration() {
                    return self.isPropUpdated ? "none" : "underline";
                }
            };
        }
    },
    {
        isPropUpdated: state?.textAlign === "left",
        path: `<path data-id="align-left" data-type="btn-icon" fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>`,
        get isActive() {
            return this.isPropUpdated;
        },
        get value() {
            const self = this;
            return {
                get textAlign() {
                    return self.isPropUpdated ? "initial" : "left";
                }
            };
        }
    },
    {
        isPropUpdated: state?.textAlign === "center",
        path: `<path data-id="align-center" data-type="btn-icon" fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>`,
        get isActive() {
            return this.isPropUpdated;
        },
        get value() {
            const self = this;
            return {
                get textAlign() {
                    return self.isPropUpdated ? "initial" : "center";
                }
            };
        }
    },
    {
        isPropUpdated: state?.textAlign === "right",
        path: `<path data-id="align-right" data-type="btn-icon" fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>`,
        get isActive() {
            return this.isPropUpdated;
        },
        get value() {
            const self = this;
            return {
                get textAlign() {
                    return self.isActive ? "initial" : "right";
                }
            };
        }
    }
]);
