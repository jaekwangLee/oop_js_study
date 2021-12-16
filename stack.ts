{
    interface Stack {
        readonly size: number;
        pop(): string;
        push(value: string): void;
    }

    class StackTest1 implements Stack {
        private obj: any = {}
        private _size: number = 0;

        get size(): number {
            return this._size;
        }

        push = (value: string) => {
            this.obj[(this.size).toString()] = value;
            this._size ++;
        }

        pop = () => {
            this._size --;
            const value = this.obj[this._size.toString()];
            delete this.obj[this._size.toString()];
            return value;
        }
    }

    const stack = new StackTest1();
    stack.push('jk')
    stack.push('zl')
    stack.push('steve');
    while(stack.size !== 0) {
        console.log(stack.pop());
    }

    type StackNode = {
        value: string;
        next?: StackNode;
    }

    class StackTest2 implements Stack {
        private _size: number = 0;
        private head?: StackNode;

        get size(): number {
            return this._size;
        }

        push = (value: string) => {
            const node = { value, next: this.head };
            this.head = node;
            this._size++;
        }

        pop = (): string => {
            if (this.head == null) {
                throw new Error('no more data');
            }

            const node = this.head;
            const value = this.head.value;
            this.head = node.next;
            this._size--;

            return value;
        }
    }

    const stack2 = new StackTest2();
    stack2.push('value1')
    stack2.push('value2')
    stack2.push('value3')
    while(stack2.size !== 0) {
        console.log(stack2.pop());
    }
}