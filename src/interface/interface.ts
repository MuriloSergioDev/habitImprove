export interface StudentInterface {
    id: string,
    name?: string,
}

export interface TurmaInterface {
    id ?: string,
    title?: string,
    start?: string,
    end?: string,
    status ?: boolean,
}

export interface HabitoInterface {
    id ?: string,
    titulo: string,
    horario: Date | any ,
    recorrencia: string,
    contador: string,
    diasSeguidos: string,
    dataUltimaRealizacao?: Date | any ,
    dataCriacao ?:  Date | any ,
    diasDaSemana?: Array<string>,
    diaMes?: Date,
    uid?: string
}

export interface UserInterface {
    uid ?: string
    name ?: string
    email ?: string
    password ?: string
    turma ?: string
    permission ?: number
}

export interface DesempenhoInterface {
    uid ?: string
    facil ?: number
    medio ?: number
    dificil ?: number
    bimestre ?: number
    turma ?: string
}

export interface dateFirebase {
    seconds : string,
    nanoseconds : string
}

export interface NewsInterface {
    id ?: string,
    idUsuario ?: string,
    reacoes : number,
    descricao ?: string,
    comentarios ?: string[],
    tipo ?: string,
}