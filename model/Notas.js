export const esCorchea = nota => nota.duration === '8'

export const esSemi = nota => nota.duration === '16'

export const esSilencio = nota => nota.pitch === 'r'

export const esEnlazable = nota => esCorchea(nota) || esSemi(nota)
