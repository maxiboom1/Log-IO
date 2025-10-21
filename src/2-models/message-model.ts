class MessageModel{
    public time: string;
    public pgmSrcNum: number;
    public pgmSrcName: string;

    public constructor (message: MessageModel){
        this.time = message.time;
        this.pgmSrcNum = message.pgmSrcNum;
        this.pgmSrcName = message.pgmSrcName;
    }
     
}

export default MessageModel;