import { differenceInYears } from 'date-fns';

/**
 * Calcula a idade com base na data de nascimento
 * @param {string | Date} dataNascimento - Data de nascimento no formato ISO ou objeto Date
 * @returns {number} - Idade em anos
 */
const calcularIdade = (dataNascimento: string | Date): number => {
    // Certifica-se de que a data é um objeto Date
    const data = typeof dataNascimento === 'string' ? new Date(dataNascimento) : dataNascimento;

    // Calcula a diferença em anos
    return differenceInYears(new Date(), data);
};

export default calcularIdade;
