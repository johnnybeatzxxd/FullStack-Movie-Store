import React, { useState } from 'react';
import styled from "styled-components";

export function Field({ name, action, inputType }) {

    return (
        <Fields>
            <p>{name}:</p>
            <InputField onChange={(event)=>{action(event.target.value)}} type={inputType}/>
        </Fields>
    );
}

const Fields = styled.div`
    display:flex;
    gap:10px;
    flex-direction:row;
    align-items:center;
`;

const InputField = styled.input`
    height: 20px;
    &:focus {
        outline: none;
    }
`;

