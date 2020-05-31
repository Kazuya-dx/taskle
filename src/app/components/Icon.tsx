interface IconProps {
  icon: string;
  background: string;
  decoration: string;
  size: string;
}

const Icon: React.FC<IconProps> = ({ icon, background, decoration, size }) => {
  const backgroundStyle = {
    width: size,
    height: size,
    backgroundColor: background,
    margin: decoration,
    padding: icon,
  };
  const iconStyle = {
    width: size,
    height: size,
  };
  const iconName = icon;
  if (iconName == "0") {
    return <div style={backgroundStyle}></div>;
  } else {
    return (
      <div style={backgroundStyle}>
        <img style={iconStyle} src={`/icons/${iconName}.png`} />
      </div>
    );
  }
};

export default Icon;
