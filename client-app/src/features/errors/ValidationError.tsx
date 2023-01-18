import { Message, MessageItem } from "semantic-ui-react";

interface Props{
    errors:string[];
}

export default function ValidationError({errors}:Props)
{
    return (
        <Message error>
            {errors&&(

                <Message.List>
                    {errors.map((err:string,i)=>(
                        <MessageItem key={i}>
                            {err}
                        </MessageItem>
                    ))}
                </Message.List>
            )}
            
            
        </Message>
    )
}