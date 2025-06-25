import { IContrat } from 'src/app/models/contrat.model';

export class Tools {

    public static formatDate(date: string, lang= 'fr'): Date {
      console.log('formatDate :::> ', date);
      const currentDate = lang == 'fr' ? date.split('-') : date.split('-').reverse();
      const dateFormat = new Date(
          parseInt(currentDate[0]),
          parseInt( currentDate[1]) - 1,
          parseInt(currentDate[2])
      );
      return dateFormat;
    }

    public static getDateFr(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const dayFnl = `${day}`.length === 1 ? `0${day}` : day;
        const monthFnl = `${month}`.length === 1 ? `0${month}` : month;
        return `${dayFnl}/${monthFnl}/${year}`;
    }

    public static getDateEn(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const dayFnl = `${day}`.length === 1 ? `0${day}` : day;
        const monthFnl = `${month}`.length === 1 ? `0${month}` : month;
        return `${year}-${monthFnl}-${dayFnl}`;
    }

    public static getMinDateInContratArray(contrats: IContrat[]): Date{
      let minContratDate: Date = new Date(contrats[0].detailContrat.dateSignature);
      for (const contrat of contrats) {
        const contratDateCreated: Date = new Date(contrat.detailContrat.dateSignature);
        if (contratDateCreated.getTime() < minContratDate.getTime()) {
          minContratDate = contratDateCreated;
        }
      }
      return minContratDate;
    }

    public static getContratCloseTime(dateNaiss: Date, ctrtTime: number): Date {
        const day = dateNaiss.getDate();
        const month = dateNaiss.getMonth();
        const year = dateNaiss.getFullYear() + ctrtTime;
        return new Date(year, month, day);
    }

    public static createPdfByBase64(base64: string) {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    public static b64toBlob(b64Data: string, contentType= '', sliceSize= 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }

    public static convertBase64ToBlob = async (base64) => {
      const response = await fetch(base64);
      const blob = await response.blob();
      return blob;
    };

    public static generatePayRef():string{
      let d = new Date().getTime();
      let uuid = 'xxxx-IXP-xxx-xxxx'.replace(/[xy]/g, (c) => {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        }
      );
      return uuid;
    }

    public static async groupProduitByNature(array: any): Promise<any[]> {
      let listProduit :any[] = [];
      const natures = array.map((item: any) => item.natureProduit)
                           .filter((value: any, index: any,self: any) => self.indexOf(value) === index);
      natures.forEach((item: any) => {
        const produits = array.filter((x: any) => x.natureProduit === item );
        const libelle = array.find((x: any) => x.natureProduit === item ).libelleNatureProduit;
        const currentData = {
          nature: item,
          libelle: libelle,
          data: produits
        }
        listProduit.push(currentData)
      })
      return await listProduit
    }

    public static sleep(ms: number): Promise<any> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

}
