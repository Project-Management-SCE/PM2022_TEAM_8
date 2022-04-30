import React, {FC} from 'react';
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import {Collapse, DatePicker, Divider} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import {MovieGenres} from "../api/ExternalApiResponseTypes";

interface props{
    searchType:string;
    setSearchType:any;
    genres:MovieGenres[]
    setGenres:any;
}
const ExtendedSearchMenu:FC<props> = ({searchType,setGenres,setSearchType,genres}) => {
    return (
        <div className="left">
            <ButtonGroup >
                <ToggleButton
                    key={"Movies"}
                    type="radio"
                    value="Movies"
                    variant="outline-danger"
                    checked={searchType === "Movies"}
                    onClick={(e) => setSearchType("Movies")}
                >
                    Movies
                </ToggleButton>
                <ToggleButton
                    key={"Series"}
                    type="radio"
                    value="Series"
                    variant="outline-danger"
                    checked={searchType === "Series"}
                    onClick={(e) => setSearchType("Series")}
                >
                    Series
                </ToggleButton>
            </ButtonGroup>
            <Divider style={{borderColor:"white",color:"white"}} className={"text-decor"}>Genres</Divider>

            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                style={{marginBottom:"1rem"}}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                <Collapse.Panel header="Select Genres" key="1" >
                    <ButtonGroup vertical={true}>
                        {genres.map((genre) => {
                            return (
                                <ToggleButton
                                    key={genre.id}
                                    type="radio"
                                    value={genre.id}
                                    variant="outline-dark"
                                    checked={genre.checked}
                                    onClick={(e) => setGenres(genres.map((g) => {
                                        if (g.id === genre.id) {
                                            g.checked = !g.checked;
                                        }
                                        return g;
                                    }))}
                                >
                                    {genre.name}
                                </ToggleButton>
                            );
                        })}
                    </ButtonGroup>
                </Collapse.Panel>
            </Collapse>
            <Divider style={{borderColor:"white",color:"white"}} className={"text-decor"}>Release Date</Divider>
            <p className={"text-decor"}>From</p>
            <DatePicker  picker={"year"}/>
            <p className={"text-decor"}>To</p>
            <DatePicker   picker={"year"}/>
        </div>
    );
};

export default ExtendedSearchMenu;