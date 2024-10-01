import { useState, useEffect } from "react";
import { Sheet } from "react-modal-sheet";
import { themes } from "../../data/themes";
import {
  metropolitan_government,
  local_government,
} from "../../data/districts";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";
import styled from "styled-components";
import { City, Filters } from "../../types/common";

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export default function FilterSheet({
  isOpen,
  onClose,
  filters,
  setFilters,
}: FilterSheetProps) {
  const [selectedTheme, setSelectedTheme] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedMetropolitan, setSelectedMetropolitan] = useState<City[]>([]);
  const [selectedLocal, setSelectedLocal] = useState<City[]>([]);
  const maxCount = 5;

  // FilterSheet가 열릴 때: 전역 상태의 필터를 로컬 상태로 가져오기
  useEffect(() => {
    if (isOpen) {
      setSelectedTheme(filters.theme);
      setSelectedCity(null);
      setSelectedMetropolitan(filters.metropolitanGovernments);
      setSelectedLocal(filters.localGovernments);
    }
  }, [isOpen, filters]);

  // 여행 테마 선택
  const handleThemeSelect = (theme: string) => {
    setSelectedTheme((prevThemes) =>
      prevThemes.includes(theme)
        ? prevThemes.filter((t) => t !== theme)
        : [...prevThemes, theme]
    );
  };

  // 광역시/도 선택
  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  // 시/군/구 선택
  const handleDistrictSelect = (city: City) => {
    if (selectedCity) {
      // '전체'가 선택된 경우
      if (city.id === -1) {
        // 이미 포함되어 있는 경우
        if (selectedMetropolitan.includes(selectedCity)) {
          // selectedMetropolitan에서 selectedCity와 같은 것 제거
          setSelectedMetropolitan(
            selectedMetropolitan.filter((d) => d !== selectedCity)
          );
        }
        // 이미 포함되어 있지 않은 경우
        else {
          // selectedLocal에서 (selectedCity.id와 metropolitanId가 같은) district 제거
          setSelectedLocal(
            selectedLocal.filter((d) => {
              const government = local_government.find(
                (government) => government.metropolitanId === selectedCity.id
              );
              return (
                government &&
                !government.districts.some((district) => district === d)
              );
            })
          );
          // selectedMetropolitan에 selectedCity 추가
          setSelectedMetropolitan([...selectedMetropolitan, selectedCity]);
        }
        // '전체'가 아닌 것이 선택된 경우
      } else {
        // 이미 포함되어 있는 경우
        if (selectedLocal.includes(city)) {
          // selectedLocal에서 city와 같은 것 제거
          setSelectedLocal(selectedLocal.filter((d) => d.id !== city.id));
        }
        // 이미 포함되어 있지 않은 경우
        else {
          // selectedMetropolitan에서 (selectedCity.id와 metroplitan.id가 같은) district 제거
          setSelectedMetropolitan(
            selectedMetropolitan.filter((d) => d.id !== selectedCity.id)
          );
          // selectedLocal에 city 추가
          setSelectedLocal([...selectedLocal, city]);
        }
      }
    }
  };

  // 적용 버튼: 로컬 상태의 필터를 전역 상태로 set
  const handleApplyFilters = () => {
    setFilters({
      theme: selectedTheme,
      metropolitanGovernments: selectedMetropolitan,
      localGovernments: selectedLocal,
    });
    onClose();
  };

  // 필터 초기화
  const handleResetFilters = () => {
    setSelectedTheme([]);
    setSelectedCity(null);
    setSelectedMetropolitan([]);
    setSelectedLocal([]);
  };

  // 필터 제거
  const handleRemoveTheme = (value: string) => {
    setSelectedTheme((prevThemes) => prevThemes.filter((t) => t !== value));
  };

  const handleRemoveMetropolitan = (value: City) => {
    setSelectedMetropolitan((prevDistricts) =>
      prevDistricts.filter((d) => d !== value)
    );
  };

  const handleRemoveLocal = (value: City) => {
    setSelectedLocal((prevDistricts) =>
      prevDistricts.filter((d) => d !== value)
    );
  };

  return (
    <StyledSheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <ContentWrapper>
            <h3>#여행테마</h3>
            <FiltersWrapper>
              {themes.map((theme) => (
                <FilterButton
                  key={theme}
                  onClick={() => handleThemeSelect(theme)}
                  selected={selectedTheme.includes(theme)}
                >
                  {theme}
                </FilterButton>
              ))}
            </FiltersWrapper>
            <h3>#광역시/도</h3>
            <FiltersWrapper>
              {metropolitan_government.map((city) => (
                <FilterButton
                  key={city.id}
                  onClick={() =>
                    handleCitySelect({
                      id: city.id,
                      name: city.name,
                      fullname: city.fullname,
                    })
                  }
                  selected={selectedCity?.id === city.id}
                >
                  {city.fullname}
                </FilterButton>
              ))}
            </FiltersWrapper>
            {selectedCity && (
              <>
                <h3>#시/군/구</h3>
                <FiltersWrapper>
                  <FilterButton
                    key={-1}
                    onClick={() =>
                      handleDistrictSelect({
                        id: -1,
                        name: selectedCity.name,
                        fullname: selectedCity.fullname,
                      })
                    }
                    selected={selectedMetropolitan.includes(selectedCity)}
                    disabled={
                      selectedMetropolitan.length + selectedLocal.length >=
                      maxCount
                    }
                  >
                    전체
                  </FilterButton>
                  {local_government
                    .find(
                      (government) =>
                        government.metropolitanId === selectedCity.id
                    )
                    ?.districts.map((district) => (
                      <FilterButton
                        key={district.id}
                        onClick={() => handleDistrictSelect(district)}
                        selected={selectedLocal.includes(district)}
                        disabled={
                          selectedMetropolitan.length + selectedLocal.length >=
                            maxCount && !selectedLocal.includes(district)
                        }
                      >
                        {district.name}
                      </FilterButton>
                    ))}
                </FiltersWrapper>
              </>
            )}
            <SelectedFilters>
              {selectedTheme.length > 0 && (
                <>
                  {selectedTheme.map((theme) => (
                    <FilterTag
                      key={theme}
                      onClick={() => handleRemoveTheme(theme)}
                    >
                      {theme}
                      <IconWrapper>
                        <StyledXIcon />
                      </IconWrapper>
                    </FilterTag>
                  ))}
                </>
              )}
              {selectedMetropolitan.length > 0 && (
                <>
                  {selectedMetropolitan.map((district) => (
                    <FilterTag
                      key={district.id}
                      onClick={() => handleRemoveMetropolitan(district)}
                    >
                      {district.fullname}
                      <IconWrapper>
                        <StyledXIcon />
                      </IconWrapper>
                    </FilterTag>
                  ))}
                </>
              )}
              {selectedLocal.length > 0 && (
                <>
                  {selectedLocal.map((district) => (
                    <FilterTag
                      key={district.id}
                      onClick={() => handleRemoveLocal(district)}
                    >
                      {district.fullname}
                      <IconWrapper>
                        <StyledXIcon />
                      </IconWrapper>
                    </FilterTag>
                  ))}
                </>
              )}
              {selectedTheme.length +
                selectedMetropolitan.length +
                selectedLocal.length >
                0 && <FilterTag onClick={handleResetFilters}>초기화</FilterTag>}
            </SelectedFilters>
            <SelectedCount>
              선택된 도시: {selectedMetropolitan.length + selectedLocal.length}{" "}
              / {maxCount}
            </SelectedCount>
          </ContentWrapper>
          {selectedTheme.length +
            selectedMetropolitan.length +
            selectedLocal.length >
            0 && (
            <ActionButton onClick={handleApplyFilters}>GOOD !</ActionButton>
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </StyledSheet>
  );
}

const StyledSheet = styled(Sheet)`
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentWrapper = styled.div`
  padding: 0 16px 100px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
  h3 {
    margin: 0;
  }
`;

const FiltersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`;

const FilterButton = styled.button<{ selected: boolean; disabled?: boolean }>`
  padding: 8px 0;
  background-color: ${({ selected }) => (selected ? "#3C61E6" : "#ffffff")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: 1px solid #3c61e6;
  border-radius: 12px;
  text-align: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const SelectedFilters = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 14px;
`;

const SelectedCount = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: #666;
`;

const FilterTag = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 8px;
  color: white;
  background-color: #3c61e6;
  border-radius: 12px;
`;

const IconWrapper = styled.div`
  background-color: white;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledXIcon = styled(XIcon)`
  width: 8px;
  height: 8px;
`;

const ActionButton = styled.button`
  position: fixed;
  bottom: 34px;
  width: 240px;
  height: 48px;
  background-color: #abe5e3;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: bold;
  left: 50%;
  transform: translateX(-50%);
`;
