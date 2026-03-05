
export default class Queue<T> {
    private value: T[]

    public constructor(initial: T[] = []) {
        this.value = initial;
    }

    /**
     * Adiciona um valor no topo da fila.
     * @param value - Valor a ser adicionado na fila.
     */
    public enqueue(value: T): void {
        this.value.push(value)
    }

    /**
     * Retira e retorna o primeiro valor da fila 
     * @returns - O primeiro valor da fila, caso exista.
     */
    public dequeue(): T | undefined {
        return this.value.shift()
    }

    public empty(): boolean {
        return this.value.length == 0
    }

    public toString(): string {
        return this.value.join(', ')
    }
}