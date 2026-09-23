from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

Role = Literal["consolidator", "transit", "distributor", "terminal", "coordinator", "peripheral"]


class Question(BaseModel):
    model_config = ConfigDict(extra="forbid")
    question: str = Field(min_length=3, max_length=4000)
    gids: list[str] = Field(default_factory=list, max_length=20)
    hops: int = Field(default=2, ge=1, le=4)

    @field_validator("question")
    @classmethod
    def nonempty_question(cls, value: str) -> str:
        if len(value.strip()) < 3:
            raise ValueError("Вопрос должен содержать хотя бы 3 символа")
        return value.strip()

    @field_validator("gids")
    @classmethod
    def valid_gids(cls, values: list[str]) -> list[str]:
        if any(not v.isascii() or not v.isdecimal() or int(v) > 2**63 - 1 for v in values):
            raise ValueError("gid должен быть строкой с неотрицательным int64")
        return list(dict.fromkeys(str(int(v)) for v in values))


class AssistantAnswer(BaseModel):
    model_config = ConfigDict(extra="forbid")
    answer: str = Field(min_length=1)
    cited_gids: list[str]
    limitations: list[str]
    suggested_checks: list[str]


def wire(value, key: str = ""):
    """Preserve int64 identifiers across JavaScript clients."""
    if value is None:
        return None
    if isinstance(value, dict):
        return {k: wire(v, k) for k, v in value.items()}
    if isinstance(value, (list, tuple)):
        child_key = "gid" if key in {"top_gids", "gids", "path", "cited_gids"} else ""
        return [wire(v, child_key) for v in value]
    if key in {"gid", "src", "dst"}:
        return str(value)
    return value


class Node(BaseModel):
    gid: str
    depth: int
    is_seed: bool
    cluster_id: int
    role: Role
    role_score: float
    priority_score: float
    evidence: str
    priority_evidence: str
    priority_components: dict[str, float]
    in_degree: int
    out_degree: int
    in_kzt: float
    out_kzt: float
    seed_reach: int
    betweenness: float
    betweenness_rank: float
    boundary_censored: bool
    observed_out_in_ratio: float | None
    incoming_active_days: int
    outgoing_active_days: int
    near_outgoing_day_ratio: float | None
    max_same_day_senders: int
    warnings: list[str]


class Edge(BaseModel):
    src: str
    dst: str
    sum_kzt: float
    n_tx: int
    depth: int


class Transaction(BaseModel):
    src: str
    dst: str
    sum_kzt: float
    date: str


class Cluster(BaseModel):
    cluster_id: int
    n_nodes: int
    n_seed: int
    sum_kzt_internal: float
    top_gids: list[str]
    hypothesis: str


class TopNode(BaseModel):
    rank: int
    gid: str
    role: Role
    priority_score: float
    why: str


class Page[T](BaseModel):
    total: int
    limit: int
    offset: int
    items: list[T]


class TopList(BaseModel):
    total: int
    items: list[TopNode]


class Graph(BaseModel):
    nodes: list[Node]
    edges: list[Edge]
    total_nodes: int
    truncated: bool
    directed: bool


class GraphPath(BaseModel):
    path: list[str]
    edges: list[Edge]
    hops: int
    caveat: str
