import React from 'react';



interface Props {
  color: string;
  width: number;
  height: number;
}

class LogoIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 28,
    height: 32
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 28.229 32.379"
      >
        <path
          id="Path_60567"
          data-name="Path 60567"
          d="M267.386,308.369l-1.426-3.217a3.789,3.789,0,0,0-1.936-1.932l-.376-2.5.481-.161a.235.235,0,0,0,.148-.3c-1.34-3.991-5.382-6.57-10.3-6.572s-8.96,2.581-10.3,6.572a.235.235,0,0,0,.148.3l.481.161-.376,2.5a3.789,3.789,0,0,0-1.936,1.932l-1.426,3.217a3.807,3.807,0,0,0,1.654,4.873.217.217,0,0,0,.064.045l1.582.7a.235.235,0,0,0,.31-.12l.645-1.456.468,4.034a.234.234,0,0,0,.05.119l4.77,5.982a6.369,6.369,0,0,0,.2,1.412c.363,1.328,1.07,1.607,1.6,1.607h4.13c.529,0,1.236-.279,1.6-1.607a6.372,6.372,0,0,0,.2-1.412l4.77-5.982a.234.234,0,0,0,.05-.119l.468-4.034.645,1.456a.235.235,0,0,0,.31.12l1.582-.7a.217.217,0,0,0,.064-.045A3.807,3.807,0,0,0,267.386,308.369ZM244.2,300.188c1.348-3.67,5.157-6.029,9.777-6.03s8.428,2.36,9.777,6.03l-.891.3c-.955-2.536-3.807-5.388-8.885-5.39s-7.931,2.855-8.885,5.39Zm15.261,3.943.558,1.259a17.171,17.171,0,0,0-12.084,0l.558-1.259a.235.235,0,0,0-.12-.31l-1.581-.7a.236.236,0,0,0-.081-.019,3.777,3.777,0,0,0-2.277-.062l.325-2.168.4.135a.235.235,0,0,0,.3-.148c.819-2.44,3.541-5.289,8.519-5.291s7.7,2.851,8.519,5.291a.235.235,0,0,0,.3.148l.4-.135.326,2.168a3.777,3.777,0,0,0-2.277.062.235.235,0,0,0-.081.019l-1.582.7A.235.235,0,0,0,259.462,304.13Zm-17.185,8.6A3.338,3.338,0,0,1,241,308.559l1.426-3.217a3.316,3.316,0,0,1,1.422-1.556l-.452,3.011a.235.235,0,0,0,.2.267l.035,0a.235.235,0,0,0,.232-.2l.5-3.312a3.316,3.316,0,0,1,2.017-.07Zm1.568.732-1.152-.51,3.571-8.058.554-1.25h0l1,.443h0l.145.064-.7,1.582-.01.02Zm1.906,2.862-.377-3.256L248.011,317l.176,2.386Zm3.565,4.47h0a.908.908,0,0,1-.1-.919,1.743,1.743,0,0,1,1.436-.962l1,.622,2.09,1.3v.672c0,.334-.479.881-1.191,1.165a1.766,1.766,0,0,1-2.033-.366Zm1.871-2.392q-.088,0-.174,0l1.134-4.388,1.735.781a.234.234,0,0,0,.193,0l1.735-.781,1.134,4.388q-.086,0-.174,0Zm5.3.47-2.5,1.554-2.5-1.554Zm.706,4.97c-.229.832-.614,1.254-1.144,1.254h-4.13c-.53,0-.915-.422-1.144-1.254a5.45,5.45,0,0,1-.157-.857,2.179,2.179,0,0,0,1.634.266,2.918,2.918,0,0,0,1.727-1.087l.005-.007h0l.005.007a2.918,2.918,0,0,0,1.727,1.087,2.179,2.179,0,0,0,1.634-.266A5.45,5.45,0,0,1,257.186,323.844Zm1.454-3.048h0l-1.2,1.511a1.766,1.766,0,0,1-2.033.366c-.712-.284-1.191-.832-1.191-1.165v-.672l2.09-1.3,1-.622a1.743,1.743,0,0,1,1.436.962A.909.909,0,0,1,258.64,320.8Zm3.565-4.47-2.438,3.057.176-2.386,2.639-3.927Zm.189-3.817-2.875,4.277a.234.234,0,0,0-.039.114l-.227,3.063a1.571,1.571,0,0,0-.078-.262,2.2,2.2,0,0,0-1.733-1.239l-1.176-4.551,1.578-.077a2.493,2.493,0,0,0,1.794-.9l.87-1.057a.235.235,0,0,0-.278-.363l-6.253,2.815h0l-2.669-1.2-.786-.354-1.014-.457-1.784-.8a.235.235,0,0,0-.278.363l.87,1.057a2.493,2.493,0,0,0,1.794.9l1.578.077-1.176,4.551a2.2,2.2,0,0,0-1.733,1.239,1.571,1.571,0,0,0-.078.262l-.227-3.063a.235.235,0,0,0-.039-.114l-2.875-4.277-.468-.7.4-.894h0l2.164-4.884a16.507,16.507,0,0,1,12.648,0l2.164,4.884h0l.4.894Zm1.717.954-3.414-7.707-.01-.02-.7-1.582.145-.064h0l1-.443h0l.554,1.25,3.571,8.058Zm1.568-.732-4.1-9.246a3.316,3.316,0,0,1,2.018.07l.5,3.312a.235.235,0,0,0,.232.2l.035,0a.235.235,0,0,0,.2-.267l-.452-3.011a3.316,3.316,0,0,1,1.422,1.556l1.426,3.217A3.338,3.338,0,0,1,265.678,312.731Z"
          transform="translate(-239.863 -293.438)"
          fill={this.props.color}
          stroke={this.props.color}
          strokeMiterlimit="10"
          strokeWidth="0.5"
        />
      </svg>
    );
  }
}

export default LogoIcon;
