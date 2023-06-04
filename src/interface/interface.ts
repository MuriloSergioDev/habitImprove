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
    diaMes?: number,
    metas ?:Array<string>,
    powerup ?: boolean,
    uid?: string
}

export interface UserInterface {
    uid ?: string
    name ?: string
    email ?: string
    password ?: string
    pontuacao : number
    bonus : number
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
    comentarios : number,
    tipo ?: string,
    dataCriacao ?:  Date | any ,
}

export interface CommentsInterface {
    id ?: string,
    idUsuario ?: string,
    idNews ?: string,
    mensagem ?: string,
    nomeUsuario ?: string,
    dataCriacao ?:  Date | any ,
}

export interface RewardsInterface {
    id ?: string,
    idUsuario ?: string,
    nome ?: string,
    preco : string,
    prazo ?: string,
    surpresa ?: boolean,
    resgatado ?: boolean,
    dataCriacao ?:  Date | any ,
}

export interface RealizationsInterface {
    id ?: string,
    idUsuario ?: string,
    idHabito ?: string,
    data : Date | any ,
}