import {sha224, sha256} from "js-sha256";

class Block {
    constructor(previousBlock, transactions, timeStamp, difficulty){
        this.difficulty = difficulty;
        this.hash = '';
        this.timeStamp = timeStamp;
        this.previousBlock = previousBlock;
        this.transactions = transactions;
        this.nonce = this.createNonce();
    }
    createNonce(){
        let nonce = 0;
        const targetZeros = ('0').repeat(this.difficulty);
        while (true){
            const hash = sha256(`${nonce}${this.previousBlock}${this.transactions}`);
            if (hash.startsWith(targetZeros)){
                this.hash = hash;
                break;
            }
            nonce++;
        }

        return nonce;
    }
}
class BlockChain{
    constructor(){
        this.difficulty = 2;
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block('', 'genesis block', new Date(), this.difficulty);
    }
    addNewBlock(transactions){
        const newBlock = new Block(this.chain[this.chain.length - 1].hash, transactions,new Date(), this.difficulty);
        this.chain.push(newBlock)
    }
    validateBlock(block){
        const hash = sha256(`${block.nonce}${block.previousBlock}${block.transactions}`);
        if (block.hash === hash){
            console.log('Valid Block');
        }else{
            console.log("TEMPERED BLOCK");

        }
    }
}
const blockChain = new BlockChain();
blockChain.addNewBlock('Nuevas transacciones');
blockChain.addNewBlock('ESTO E KLIMBER')
blockChain. validateBlock(blockChain)
    console.log(blockChain)




