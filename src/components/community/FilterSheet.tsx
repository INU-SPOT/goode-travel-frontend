import { useState, useEffect } from "react";
import { Sheet } from "react-modal-sheet";
import usePostsStore from "../../store/usePostsStore";
import { themes } from "../../data/themes";
import { districts } from "../../data/districts";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";
import { useScrollStore } from "../../store/scrollStore";
import styled from "styled-components";

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const getScrollBarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

export default function FilterSheet({ isOpen, onClose }: FilterSheetProps) {
  const { filters, setFilters } = usePostsStore();
  const [selectedTheme, setSelectedTheme] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const hasScrollBar = useScrollStore((state) => state.hasScrollBar);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);
  const maxCount = 5;

  useEffect(() => {
    if (hasScrollBar) {
      setScrollBarWidth(getScrollBarWidth());
    }
  }, [hasScrollBar]);

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

    setSelectedDistricts((prevDistricts) => {
      // '전체'가 선택된 경우: 현재 광역시/도의 기존 선택들을 모두 제거하고 '전체'만 추가
      if (district === "전체") {
        // 같은 광역시/도 내의 기존 선택을 모두 제거하고 '전체'만 추가
        const updatedDistricts = prevDistricts.filter(
          (d) => !d.startsWith(selectedCity)
        );
        return [...updatedDistricts, fullDistrict];
      } else {
        // 같은 광역시/도 내에서 선택을 관리
        const isAlreadySelected = prevDistricts.includes(fullDistrict);

        if (isAlreadySelected) {
          // 이미 선택된 시/군/구를 클릭하면 제거
          return prevDistricts.filter((d) => d !== fullDistrict);
        } else {
          // 만약 '전체'가 이전에 선택되어 있다면, 그것을 제거하고 새 선택을 추가
          const updatedDistricts = prevDistricts.filter(
            (d) => d !== `${selectedCity} 전체`
          );

          // 최대 maxCount개까지만 선택 가능
          if (
            updatedDistricts.filter((d) => d.startsWith(selectedCity)).length >=
            maxCount
          ) {
            return prevDistricts; // maxCount개 이상 선택된 경우, 더 이상 추가하지 않음
          }

          return [...updatedDistricts, fullDistrict];
        }
      }
    });
  };

  // 적용 버튼: 로컬 상태의 필터를 전역 상태로 set
  const handleApplyFilters = () => {
    setFilters({
      theme: selectedTheme,
      district: selectedDistricts,
    });
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
    <StyledSheet
      isOpen={isOpen}
      onClose={onClose}
      hasScrollBar={hasScrollBar}
      scrollBarWidth={scrollBarWidth}
    >
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
                  <FilterButton
                    key="전체"
                    onClick={() => handleDistrictSelect("전체")}
                    selected={selectedDistricts.includes(
                      `${selectedCity} 전체`
                    )}
                    disabled={selectedDistricts.length >= maxCount}
                  >
                    전체
                  </FilterButton>
                  {districts[selectedCity].map((district) => (
                    <FilterButton
                      key={district}
                      onClick={() => handleDistrictSelect(district)}
                      selected={selectedDistricts.includes(
                        `${selectedCity} ${district}`
                      )}
                      disabled={
                        selectedDistricts.length >= maxCount &&
                        !selectedDistricts.includes(
                          `${selectedCity} ${district}`
                        )
                      }
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
                </>
              )}
              {(selectedTheme.length > 0 || selectedDistricts.length > 0) && (
                <FilterTag onClick={handleResetFilters}>초기화</FilterTag>
              )}
            </SelectedFilters>
            <SelectedCount>
              선택된 도시: {selectedDistricts.length} / {maxCount}
            </SelectedCount>
          </ContentWrapper>
          {(selectedTheme.length > 0 || selectedDistricts.length > 0) && (
            <ActionButton onClick={handleApplyFilters}>GOOD !</ActionButton>
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </StyledSheet>
  );
}

const StyledSheet = styled(Sheet)<{
  hasScrollBar: boolean;
  scrollBarWidth: number;
}>`
  width: 100%;
  max-width: 480px;
  margin-left: ${({ hasScrollBar, scrollBarWidth }) =>
    hasScrollBar ? `calc(240px - ${scrollBarWidth / 2}px)` : "auto"};
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
