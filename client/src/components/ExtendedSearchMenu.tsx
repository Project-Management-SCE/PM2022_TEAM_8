import React, {FC} from "react";
import {Button, ButtonGroup, ToggleButton} from "react-bootstrap";
import {Collapse, DatePicker, Divider} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import {Genres} from "../api/ExternalApiResponseTypes";
import {Moment} from "moment";

//
interface props {
    searchType: string;
    setSearchType: any;
    genres: Genres[];
    setGenres: any;
    startYear: string;
    setStartYear: any;
    endYear: string;
    setEndYear: any;
    genresList: string;
    getSearch: any;
    searchContent: any;
}

const ExtendedSearchMenu: FC<props> = ({
                                           searchType,
                                           setGenres,
                                           setSearchType,
                                           genres,
                                           setStartYear,
                                           setEndYear,
                                           searchContent,
                                       }) => {
    return (
        <div className="left">
            <ButtonGroup>
                <ToggleButton
                    key={"Movies"}
                    type="radio"
                    value="Movies"
                    variant="outline-danger"
                    checked={searchType === "Movies"}
                    onClick={() => setSearchType("Movies")}
                >
                    Movies
                </ToggleButton>
                <ToggleButton
                    key={"Series"}
                    type="radio"
                    value="TVShows"
                    variant="outline-danger"
                    checked={searchType === "Series"}
                    onClick={() => setSearchType("Series")}
                >
                    TVShows
                </ToggleButton>
            </ButtonGroup>
            <Divider
                style={{borderColor: "white", color: "white"}}
                className={"text-decor"}
            >
                Genres
            </Divider>
            <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                style={{marginBottom: "1rem"}}
                expandIcon={({isActive}) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0}/>
                )}
                className="site-collapse-custom-collapse"
            >
                <Collapse.Panel header="Select Genres" key="1">
                    <ButtonGroup vertical={true}>
                        {genres.map((genre) => {
                            return (
                                <ToggleButton
                                    key={genre.id}
                                    type="radio"
                                    value={genre.id}
                                    variant="outline-dark"
                                    checked={genre.checked}
                                    onClick={() =>
                                        setGenres(
                                            genres.map((g) => {
                                                if (g.id === genre.id) {
                                                    g.checked = !g.checked;
                                                }
                                                return g;
                                            })
                                        )
                                    }
                                >
                                    {genre.name}
                                </ToggleButton>
                            );
                        })}
                    </ButtonGroup>
                </Collapse.Panel>
            </Collapse>
            <Divider
                style={{borderColor: "white", color: "white"}}
                className={"text-decor"}
            >
                Release Date
            </Divider>
            <p className={"text-decor"}>From</p>
            <DatePicker
                picker={"year"}
                onChange={(date: Moment | null) =>
                    setStartYear(date!.year())
                }
            />
            <p className={"text-decor"}>To</p>
            <DatePicker
                picker={"year"}
                onChange={(date: Moment | null) =>
                    setEndYear(date!.year())
                }
            />
            <Button
                variant="outline-danger"
                onClick={searchContent}
                style={{marginTop: "1rem"}}
                data-testid="Search"
            >
                Search
            </Button>{" "}
        </div>
    );
};

export default ExtendedSearchMenu;
