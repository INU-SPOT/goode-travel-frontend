import styled from "styled-components";

export default function DateRange({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  return (
    <DateDisplay>
      {startDate} ~ {endDate}
    </DateDisplay>
  );
}

const DateDisplay = styled.div`
  font-size: 16px;
  text-decoration: underline;
`;
