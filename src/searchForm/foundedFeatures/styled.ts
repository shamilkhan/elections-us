import styled from "@emotion/styled";

export const Features = styled.div`
  overflow-y: auto;
  max-height: 192px;
  &::-webkit-scrollbar {
    width: 8px;
    &-track {
      background: #f0f0f0;
    }
    &-thumb {
      background: #c0c0c0;
    }
  }
`;

export const Feature = styled.div`
  height: 64px;
  cursor: pointer;
  & + & {
    border-top: 1px solid #8590a1;
  }
  &:hover {
    background: #f0f0f0;
  }
`;

export const CountyNameContainer = styled.div`
  font-size: 16px;
  line-height: 20px;
  padding: 12px 0 4px 16px;
`;

export const StateName = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: rgba(51, 70, 99, 0.3);
  padding-left: 16px;
`;
