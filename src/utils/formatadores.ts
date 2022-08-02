import moment from "moment";


const Formatadores = {
    data: (data: string) => {
        const dataFormatada = new Date(data);
        return moment(dataFormatada).format("DD/MM/YYYY");
    },
    moeda: (valor: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(valor);
    },
    trucateText: (text: string) => {
        return text.length > 250 ? text.substring(0, 250) + '...' : text;
    },
    utcToDate: (data: string) => {
        const dataFormatada = new Date(data);
        return dataFormatada.toISOString().split('T')[0];
    },
    dateToUTC: (data: string) => {
        const dataFormatada = new Date(data+"T12:00:00");
        return dataFormatada.toISOString();
    }
}

export default Formatadores;