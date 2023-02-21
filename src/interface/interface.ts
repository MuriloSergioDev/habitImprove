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
    titulo?: string,
    tipo?: string,
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