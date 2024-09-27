import styled from "styled-components";
import GoodeHeader from "../components/goode/GoodeHeader";
import FilterSummary from "../components/community/FilterSummary";
import useGoodesStore from "../store/uesGoodesStore";

export default function GoodePage() {
  const { searchQuery, setSearchQuery, filters, setFilters } = useGoodesStore();
  return (
    <GoodeContainer>
      <GoodeHeader
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />
      <FilterSummary searchQuery={searchQuery} filters={filters} />
    </GoodeContainer>
  );
}

const GoodeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
