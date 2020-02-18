import React from 'react';
import { } from './../../../components';
import { } from './../../../actions';

interface Props {
  color: string,
  width: number,
  height: number
};

class RadioIcon extends React.Component<Props> {
  public static defaultProps = {
    color: "#FFF",
    width: 35,
    height: 24
  };
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <svg id="radio" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox={`0 0 ${this.props.width} ${this.props.height}`}>
        <g id="Group_1690" data-name="Group 1690" transform="translate(13.391 16.288)">
          <g id="Group_1689" data-name="Group 1689" transform="translate(0 0)">
            <circle id="Ellipse_536" data-name="Ellipse 536" cx="1" cy="1" r="1" fill={this.props.color} />
          </g>
        </g>
        <g id="Group_1692" data-name="Group 1692" transform="translate(0 10.652)">
          <g id="Group_1691" data-name="Group 1691">
            <path id="Path_39730" data-name="Path 39730" d="M0,244v11.4a1.911,1.911,0,0,0,1.867,1.947h30.4a1.91,1.91,0,0,0,1.866-1.947V244Zm6.534,11.124a4.871,4.871,0,0,1,0-9.733,4.871,4.871,0,0,1,0,9.733Zm14.8-2.225a.272.272,0,0,1-.267.278h-8a.272.272,0,0,1-.267-.278v-5.006a.272.272,0,0,1,.267-.278h8a.272.272,0,0,1,.267.278Zm6.267,2.225a4.871,4.871,0,1,1,4.667-4.867A4.775,4.775,0,0,1,27.6,255.124Z" transform="translate(0 -244)" fill={this.props.color} />
          </g>
        </g>
        <g id="Group_1694" data-name="Group 1694" transform="translate(3.894 14.212)">
          <g id="Group_1693" data-name="Group 1693">
            <path id="Path_39731" data-name="Path 39731" d="M58.928,292a2.92,2.92,0,1,0,2.92,2.92A2.923,2.923,0,0,0,58.928,292Z" transform="translate(-56.008 -292)" fill={this.props.color} />
          </g>
        </g>
        <g id="Group_1696" data-name="Group 1696">
          <g id="Group_1695" data-name="Group 1695">
            <path id="Path_39732" data-name="Path 39732" d="M32.267,80.728H28V79.059A3,3,0,0,0,25.067,76h-16a3,3,0,0,0-2.934,3.059v1.669H1.867A1.911,1.911,0,0,0,0,82.674v3.893H34.133V82.674A1.91,1.91,0,0,0,32.267,80.728Zm-28,5.006a1.67,1.67,0,0,1,0-3.337,1.67,1.67,0,0,1,0,3.337Zm3.466-6.674a1.365,1.365,0,0,1,1.334-1.39h16a1.364,1.364,0,0,1,1.333,1.39v1.669H7.733ZM9.867,84.9H7.734a.835.835,0,0,1,0-1.669H9.867a.835.835,0,0,1,0,1.669Zm3.2,0h-.8a.835.835,0,0,1,0-1.669h.8a.835.835,0,0,1,0,1.669Zm17.867.556h-8.8a.557.557,0,0,1,0-1.112h8.8a.557.557,0,0,1,0,1.112Zm0-1.947h-8.8a.557.557,0,0,1,0-1.112h8.8a.557.557,0,0,1,0,1.112Z" transform="translate(0 -76)" fill={this.props.color} />
          </g>
        </g>
        <g id="Group_1698" data-name="Group 1698" transform="translate(18.173 16.288)">
          <g id="Group_1697" data-name="Group 1697" transform="translate(0 0)">
            <circle id="Ellipse_537" data-name="Ellipse 537" cx="1" cy="1" r="1" fill={this.props.color} />
          </g>
        </g>
        <g id="Group_1700" data-name="Group 1700" transform="translate(24.401 14.212)">
          <g id="Group_1699" data-name="Group 1699">
            <path id="Path_39733" data-name="Path 39733" d="M374.928,292a2.92,2.92,0,1,0,2.92,2.92A2.923,2.923,0,0,0,374.928,292Z" transform="translate(-372.008 -292)" fill={this.props.color} />
          </g>
        </g>
      </svg>
    );
  }
}

export default RadioIcon;
