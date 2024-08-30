import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sheet } from "react-modal-sheet";
import { RootState } from "../../store";
import { setFilters } from "../../store/postsSlice";
import { themes } from "../../data/themes";
import { districts } from "../../data/districts";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";
import styled from "styled-components";

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSheet({ isOpen, onClose }: FilterSheetProps) {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.posts.filters);
  const [selectedTheme, setSelectedTheme] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  // FilterSheet가 열릴 때: 전역 상태의 필터를 로컬 상태로 가져오기
  useEffect(() => {
    if (isOpen) {
      setSelectedTheme(filters.theme);
      setSelectedCity("");
      setSelectedDistricts(filters.district);
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
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  // 시/군/구 선택
  const handleDistrictSelect = (district: string) => {
    const fullDistrict = `${selectedCity} ${district}`;
    setSelectedDistricts((prevDistricts) =>
      prevDistricts.includes(fullDistrict)
        ? prevDistricts.filter((d) => d !== fullDistrict)
        : [...prevDistricts, fullDistrict]
    );
  };

  // 적용 버튼: 로컬 상태의 필터를 전역 상태로 set
  const handleApplyFilters = () => {
    dispatch(
      setFilters({
        theme: selectedTheme,
        district: selectedDistricts,
      })
    );
    onClose();
  };

  // 필터 초기화
  const handleResetFilters = () => {
    setSelectedTheme([]);
    setSelectedCity("");
    setSelectedDistricts([]);
  };

  // 필터 제거
  const handleRemoveFilter = (filterType: string, value: string) => {
    if (filterType === "theme") {
      setSelectedTheme((prevThemes) => prevThemes.filter((t) => t !== value));
    } else if (filterType === "district") {
      setSelectedDistricts((prevDistricts) =>
        prevDistricts.filter((d) => d !== value)
      );
    }
  };

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
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
              {Object.keys(districts).map((city) => (
                <FilterButton
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  selected={selectedCity === city}
                >
                  {city}
                </FilterButton>
              ))}
            </FiltersWrapper>
            {selectedCity && (
              <>
                <h3>#시/군/구</h3>
                <FiltersWrapper>
                  {districts[selectedCity].map((district) => (
                    <FilterButton
                      key={district}
                      onClick={() => handleDistrictSelect(district)}
                      selected={selectedDistricts.includes(
                        `${selectedCity} ${district}`
                      )}
                    >
                      {district}
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
                      onClick={() => handleRemoveFilter("theme", theme)}
                    >
                      {theme}
                      <IconWrapper>
                        <StyledXIcon />
                      </IconWrapper>
                    </FilterTag>
                  ))}
                </>
              )}
              {selectedDistricts.length > 0 && (
                <>
                  {selectedDistricts.map((district) => (
                    <FilterTag
                      key={district}
                      onClick={() => handleRemoveFilter("district", district)}
                    >
                      {district}
                      <IconWrapper>
                        <StyledXIcon />
                      </IconWrapper>
                    </FilterTag>
                  ))}
                  <FilterTag onClick={handleResetFilters}>초기화</FilterTag>
                </>
              )}
            </SelectedFilters>
          </ContentWrapper>
          <ActionButton onClick={handleApplyFilters}>GOOD !</ActionButton>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
}

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

const FilterButton = styled.button<{ selected: boolean }>`
  padding: 8px 0;
  background-color: ${({ selected }) => (selected ? "#3C61E6" : "#ffffff")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: 1px solid #3c61e6;
  border-radius: 12px;
  text-align: center;
`;

const SelectedFilters = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 14px;
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
