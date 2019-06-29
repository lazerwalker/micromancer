interface Palette {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
}

export interface Theme {
  bgColor: string;
  fgColor: string;
  normal: Palette;
  bold: Palette;
}

export const Bim: Theme = {
  bgColor: "#012849",
  fgColor: "#a9bed8",
  normal: {
    color1: "#2c2423",
    color2: "#f557a0",
    color3: "#a9ee55",
    color4: "#f5a255",
    color5: "#5ea2ec",
    color6: "#a957ec",
    color7: "#5eeea0",
    color8: "#918988"
  },
  bold: {
    color1: "#918988",
    color2: "#f579b2",
    color3: "#bbee78",
    color4: "#f5b378",
    color5: "#81b3ec",
    color6: "#bb79ec",
    color7: "#81eeb2",
    color8: "#f5eeec"
  }
};
