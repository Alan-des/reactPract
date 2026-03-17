import styled from 'styled-components';
export const Wrapper = styled.div`
padding: 8px;
border: 5px solid ${({color})=> color};
border-radius: 4px;
box-shadow: 2px 10px 15px ${({color})=> color};
`;

export const Topic = styled.h2`
 margin-top: 0 ;
 margin-bottom: 20px;
`;

export const MetaWrapper = styled.div`
display: flex;
gap: 5px;
`;

export const Button = styled.button`
  
`;


