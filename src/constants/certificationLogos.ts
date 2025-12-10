import delphiLogo from "../assets/delphi-autoparts-seeklogo.png";
import phiniaLogo from "../assets/PHINIA_idNQnSlnGy_2.png";
export type CertificationLogo = {
  name: string;
  logo: string;
};

export const certificationLogos: CertificationLogo[] = [
  { name: "Delphi Technologies", logo: delphiLogo },
  { name: "Phinia", logo: phiniaLogo },
];

