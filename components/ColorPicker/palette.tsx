import React, { useContext, useMemo } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { useControlBlock } from './hooks/useControlBlock';
import { hsvToRgb } from '../_util/color';

interface PaletteProps {
  h: number;
  s: number;
  v: number;
  onChange: (s: number, v: number) => void;
}

export const Palette = ({ h, s, v, onChange }: PaletteProps) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('color-picker');

  const { blockRef, handlerRef, onMouseDown } = useControlBlock({
    value: [s, 1 - v],
    onChange: (value) => onChange(value[0], 1 - value[1]),
  });

  const hueColor = useMemo(() => {
    const rgb = hsvToRgb(h, 1, 1);
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }, [h]);

  const renderHandler = () => {
    return (
      <div
        ref={handlerRef}
        className={`${prefixCls}-handler`}
        style={{
          top: `${(1 - v) * 100}%`,
          left: `${s * 100}%`,
        }}
      />
    );
  };

  return (
    <div
      ref={blockRef}
      className={`${prefixCls}-palette`}
      style={{ backgroundColor: hueColor }}
      onMouseDown={onMouseDown}
    >
      {renderHandler()}
    </div>
  );
};
