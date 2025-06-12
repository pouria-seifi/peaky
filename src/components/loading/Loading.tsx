import React from "react";
import Image from 'next/image';

const Loading = () => {


    return (
        <div id="Loading" >
            <Image
                src="/illus/loading.svg"
                alt="loadiing"
                layout='fixed'
                width={110}
                height={110}
            />
        </div>
    )
}

export default Loading;