import { useState, useEffect } from "react";
import {
  ExternalLink,
  Gamepad2,
  Ghost,
  X,
  Monitor,
  Cpu,
  MemoryStick,
  HardDrive,
  Tv,
  Info,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

type GameStatus = "launched" | "dev";
type Filter = "all" | "launched" | "dev";

interface SystemRequirements {
  os?: string;
  processor?: string;
  memory?: string;
  graphics?: string;
  storage?: string;
}

interface Game {
  id: number;
  title: string;
  tagline: string;
  description: string;
  fullDescription?: string;
  systemRequirements?: SystemRequirements;
  genre: string[];
  status: GameStatus;
  itchUrl: string;
  coverImage: string;
  coverImageVertical?: string;
  screenshots?: string[];
  year?: number;
  icon: React.ReactNode;
}

const games: Game[] = [
  {
    id: 1,
    title: "Forbidden Fear",
    tagline: "Você não está sozinho lá dentro",
    description:
      "Um antigo manicômio abandonado esconde segredos que deveriam ter permanecido enterrados.",
    fullDescription:
      "Forbidden Fear é um jogo de horror psicológico em um manicômio abandonado há décadas. Ao explorar seus corredores decadentes, você descobre que os pacientes nunca realmente foram embora e algo muito mais antigo os mantém presos ali. Resolva enigmas, fuja das entidades que habitam o local e descubra a verdade sombria por trás da instituição. Cada escolha importa. Cada som tem significado. Você vai descobrir o que aconteceu mas vai conseguir sair com a sanidade intacta?",
    systemRequirements: {
      os: "Windows 10 / 11 (64-bit)",
      processor: "Intel Core i3-4340 or better",
      memory: "8 GB RAM",
      graphics: "Compatible OpenGL / VRAM 1GB or better",
      storage: "1 GB disponíveis",
    },
    genre: ["Horror", "RPG"],
    status: "dev",
    itchUrl:
      "https://striker-game-studios.itch.io/forbidden-fear",
    coverImage:
      "https://img.itch.zone/aW1nLzE1MDk1MjM0LnBuZw==/315x250%23c/NsVH9S.png",
    coverImageVertical:
      "https://res.cloudinary.com/e3wn4cfq/image/upload/v1787125434/ff_cover.png",
    // substitua pela URL da sua capa 720x1280 (9:16)
    screenshots: [
      "https://img.itch.zone/aW1hZ2UvMzc3NDIzLzE1NzIzMTAzLnBuZw==/original/xJac6h.png",
      "https://img.itch.zone/aW1hZ2UvMzc3NDIzLzcyMDY1OTcucG5n/original/kPFxCt.png",
      "https://img.itch.zone/aW1hZ2UvMzc3NDIzLzcyMDY2MDIucG5n/original/FLZTS1.png",
    ],
    icon: <Ghost className="w-4 h-4" />,
  },
  {
    id: 2,
    title: "Devil Tears",
    tagline: "Até o inferno tem suas cicatrizes",
    description:
      "Um ARPG sombrio onde você empunha poderes demoníacos para enfrentar um mundo corrompido pela escuridão.",
    fullDescription:
      "Devil Tears é um action RPG de perspectiva isométrica onde você joga como um ser entre dois mundos humano o suficiente para sentir dor, demoníaco o suficiente para causar destruição. Em um reino corrompido por uma força ancestral, você deve dominar habilidades das trevas para sobreviver e descobrir sua verdadeira origem. Combate fluido, sistema de upgrades profundo e uma narrativa que não tem medo de ir a lugares sombrios.",
    systemRequirements: {
      os: "TBD",
      processor: "TBD",
      memory: "TBD",
      graphics: "TBD",
      storage: "TBD",
    },
    genre: ["ARPG"],
    status: "dev",
    itchUrl: "",
    coverImage:
      "https://res.cloudinary.com/e3wn4cfq/image/upload/c_scale,w_600/dpr_auto/q_auto/f_auto/dt_cover-square.png",
    coverImageVertical:
      "https://res.cloudinary.com/e3wn4cfq/image/upload/c_scale,w_600/dpr_auto/q_auto/f_auto/dt_cover-portrait.png",
    // substitua pela URL da sua capa https://res.cloudinary.com/e3wn4cfq/image/upload/c_scale,w_1200/dpr_auto/q_auto:best/f_auto/dt_cover-portrait.png
    screenshots: [
      "https://res.cloudinary.com/e3wn4cfq/image/upload/v1787273359/ui_mission-select.png",
      "https://res.cloudinary.com/e3wn4cfq/image/upload/v1787273330/ui_customize.png",
      "https://res.cloudinary.com/e3wn4cfq/image/upload/v1787273664/screenshot_gameplay.png",
    ],
    icon: <Ghost className="w-4 h-4" />,
  },
];

const filterLabels: Record<Filter, string> = {
  all: "Todos",
  launched: "Lançados",
  dev: "Em Desenvolvimento",
};

export default function App() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Game | null>(null);

  const filtered = games.filter((g) =>
    filter === "all" ? true : g.status === filter,
  );

  const launchedCount = games.filter(
    (g) => g.status === "launched",
  ).length;
  const devCount = games.filter(
    (g) => g.status === "dev",
  ).length;

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/8 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)",
        }}
      />

      {/* ─── NAV ─── */}
      <header className="relative z-20 border-b border-border backdrop-blur-md sticky top-0">
        <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-primary" />
            </div>
            <span
              className="text-base tracking-[0.2em] uppercase text-foreground"
              style={{ fontFamily: "'Russo One', sans-serif" }}
            >
              Striker Game Studios
            </span>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <a
              href="#jogos"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Jogos
            </a>
            <a
              href="https://striker-game-studios.itch.io"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
              }}
            >
              itch.io
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </nav>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <p
              className="text-primary mb-5 tracking-[0.35em] uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
              }}
            >
              ∕∕ Desenvolvedor Independente
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight mb-6"
              style={{ fontFamily: "'Russo One', sans-serif" }}
            >
              Mundos que
              <br />
              <span className="text-primary">você não vai</span>
              <br />
              esquecer.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              Criando experiências indie únicas atmosféricas,
              narrativas e cheias de personalidade. Cada jogo
              começa com uma pergunta que não me sai da cabeça.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="https://striker-game-studios.itch.io"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm tracking-wider hover:bg-primary/80 transition-colors"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                }}
              >
                Ver no itch.io
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#jogos"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                explorar jogos ↓
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="flex lg:flex-col gap-px border border-border self-start lg:self-end min-w-[160px]">
            <div className="flex-1 lg:flex-none p-5 bg-card border-b border-border">
              <div
                className="text-4xl text-primary mb-1"
                style={{
                  fontFamily: "'Russo One', sans-serif",
                }}
              >
                {launchedCount}
              </div>
              <div
                className="text-muted-foreground uppercase tracking-widest"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                }}
              >
                Lançados
              </div>
            </div>
            <div className="flex-1 lg:flex-none p-5 bg-card">
              <div
                className="text-4xl text-accent mb-1"
                style={{
                  fontFamily: "'Russo One', sans-serif",
                }}
              >
                {devCount}
              </div>
              <div
                className="text-muted-foreground uppercase tracking-widest"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                }}
              >
                Em Desenvolvimento
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GAMES ─── */}
      <section
        id="jogos"
        className="relative z-10 max-w-6xl mx-auto px-6 pb-24"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
          <h2
            className="text-2xl tracking-wide"
            style={{ fontFamily: "'Russo One', sans-serif" }}
          >
            Jogos
          </h2>

          <div className="flex gap-px bg-secondary/60 border border-border p-px">
            {(["all", "launched", "dev"] as Filter[]).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-xs tracking-wider transition-all cursor-pointer ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {filterLabels[f]}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {filtered.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onOpen={() => setSelected(game)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Nenhum jogo nessa categoria ainda.
          </div>
        )}
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-primary/50" />
            <span className="text-muted-foreground text-sm">
              © 2026 Striker Game Studios. feito com paixão e
              muita cafeína
            </span>
          </div>
          <a
            href="https://striker-game-studios.itch.io"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-primary hover:text-primary/70 transition-colors text-sm"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Striker Game Studios
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>

      {/* ─── MODAL ─── */}
      <GameModal
        game={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

/* ─── CARD ─── */
function GameCard({
  game,
  onOpen,
}: {
  game: Game;
  onOpen: () => void;
}) {
  const isLaunched = game.status === "launched";

  return (
    <div className="group bg-card flex flex-col overflow-hidden hover:bg-violet-950/20 transition-colors duration-500">
      {/* Cover — clickable */}
      <button
        onClick={onOpen}
        className="relative overflow-hidden aspect-video bg-secondary flex-shrink-0 cursor-pointer w-full text-left"
      >
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* "Ver detalhes" hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span
            className="bg-background/80 backdrop-blur-sm border border-primary/40 text-primary px-4 py-2 text-xs tracking-widest uppercase flex items-center gap-2"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <Info className="w-3.5 h-3.5" />
            Ver detalhes
          </span>
        </div>

        {/* Status pill */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] tracking-[0.2em] uppercase border ${
              isLaunched
                ? "bg-emerald-950/90 text-emerald-400 border-emerald-700/40"
                : "bg-amber-950/90 text-amber-400 border-amber-700/40"
            }`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isLaunched
                  ? "bg-emerald-400"
                  : "bg-amber-400 animate-pulse"
              }`}
            />
            {isLaunched ? "Lançado" : "Em Desenvolvimento"}
          </span>
        </div>

        {game.year && (
          <div className="absolute top-3 right-3">
            <span
              className="text-muted-foreground/80 text-[10px]"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {game.year}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 text-primary/40 group-hover:text-primary/60 transition-colors">
          {game.icon}
        </div>
      </button>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {game.genre.map((g) => (
            <span
              key={g}
              className="text-[10px] text-primary/60 border border-primary/15 px-2 py-0.5 tracking-wider"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {g}
            </span>
          ))}
        </div>

        <button
          onClick={onOpen}
          className="text-left group/title cursor-pointer"
        >
          <h3
            className="text-xl mb-1 leading-tight group-hover/title:text-primary transition-colors"
            style={{ fontFamily: "'Russo One', sans-serif" }}
          >
            {game.title}
          </h3>
        </button>

        <p
          className="text-muted-foreground text-sm italic mb-3"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 500,
          }}
        >
          {game.tagline}
        </p>

        <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
          {game.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <a
            href={game.itchUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wider transition-all duration-200 border ${
              isLaunched
                ? "border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
                : "border-amber-700/40 text-amber-400 hover:bg-amber-950/60"
            }`}
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.1em",
            }}
          >
            {isLaunched ? "Jogar no itch.io" : "Ver no itch.io"}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onOpen}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wider border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.1em",
            }}
          >
            <Info className="w-3.5 h-3.5" />
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MODAL ─── */
const sysReqRows: {
  key: keyof SystemRequirements;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "os",
    label: "Sistema Operacional",
    icon: <Monitor className="w-4 h-4" />,
  },
  {
    key: "processor",
    label: "Processador",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    key: "memory",
    label: "Memória RAM",
    icon: <MemoryStick className="w-4 h-4" />,
  },
  {
    key: "graphics",
    label: "Placa de Vídeo",
    icon: <Tv className="w-4 h-4" />,
  },
  {
    key: "storage",
    label: "Armazenamento",
    icon: <HardDrive className="w-4 h-4" />,
  },
];

function GameModal({
  game,
  onClose,
}: {
  game: Game | null;
  onClose: () => void;
}) {
  const [activeShot, setActiveShot] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setActiveShot(0);
  }, [game?.id]);

  useEffect(() => {
    if (
      !game ||
      !game.screenshots ||
      game.screenshots.length <= 1 ||
      isPaused
    )
      return;

    const interval = setInterval(() => {
      setActiveShot(
        (prev) => (prev + 1) % game.screenshots.length,
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [game, activeShot, isPaused]);

  if (!game) return null;
  const isLaunched = game.status === "launched";
  const verticalSrc =
    game.coverImageVertical || game.coverImage;

  return (
    <Dialog.Root
      open={!!game}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/85 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ fontFamily: "'Nunito', sans-serif" }}
          onClick={onClose}
        >
          <div
            className="relative w-full max-w-7xl bg-card border border-border flex flex-col md:flex-row overflow-hidden"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── LEFT: vertical cover (infalível, sem espaço e sem sumir) ── */}
            <div
              className="relative flex-shrink-0 bg-secondary overflow-hidden aspect-[1360/2048] md:aspect-auto"
              style={{
                // Largura EXPLÍCITA — o painel nunca colapsa
                width:
                  "min(clamp(240px, 44vw, 800px), calc(90vh * 0.664))",
              }}
            >
              <img
                src={verticalSrc}
                alt={`${game.title} — capa`}
                className="absolute inset-0 w-full h-full object-cover opacity-85"
                onError={(e) => {
                  e.currentTarget.src = game.coverImage; // nunca fica vazio
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Status badge — mantém igual */}
              <div className="absolute bottom-3 left-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] tracking-[0.2em] uppercase border ${
                    isLaunched
                      ? "bg-emerald-950/95 text-emerald-400 border-emerald-700/40"
                      : "bg-amber-950/95 text-amber-400 border-amber-700/40"
                  }`}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isLaunched
                        ? "bg-emerald-400"
                        : "bg-amber-400 animate-pulse"
                    }`}
                  />
                  {isLaunched
                    ? "Lançado"
                    : "Em Desenvolvimento"}
                </span>
              </div>
            </div>

            {/* ── RIGHT: scrollable info ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              {/* Botão X flutuante no canto superior direito */}
              <Dialog.Close asChild>
                <button className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center border border-border bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer rounded-md">
                  <X className="w-4 h-4" />
                </button>
              </Dialog.Close>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Genre tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3 pr-8">
                    {game.genre.map((g) => (
                      <span
                        key={g}
                        className="text-[10px] text-primary/60 border border-primary/15 px-2 py-0.5 tracking-wider"
                        style={{
                          fontFamily:
                            "'JetBrains Mono', monospace",
                        }}
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  <Dialog.Title asChild>
                    <h2
                      className="text-2xl leading-tight mb-1"
                      style={{
                        fontFamily: "'Russo One', sans-serif",
                      }}
                    >
                      {game.title}
                    </h2>
                  </Dialog.Title>

                  <p
                    className="text-muted-foreground italic mb-4"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    {game.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-foreground/75 text-sm leading-relaxed mb-5">
                    {game.fullDescription || game.description}
                  </p>

                  {/* itch.io button */}
                  <a
                    href={game.itchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-wider transition-all duration-200 border mb-6 ${
                      isLaunched
                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/80"
                        : "border-amber-700/40 text-amber-400 hover:bg-amber-950/60"
                    }`}
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                    }}
                  >
                    {isLaunched
                      ? "Jogar no itch.io"
                      : "Acompanhar no itch.io"}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Screenshots */}
                  {game.screenshots &&
                    game.screenshots.length > 0 && (
                      <div className="mb-6">
                        <p
                          className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3 border-b border-border pb-2"
                          style={{
                            fontFamily:
                              "'JetBrains Mono', monospace",
                          }}
                        >
                          ∕∕ Screenshots
                        </p>

                        {/* Main screenshot */}
                        <div
  className="relative w-full aspect-video overflow-hidden rounded-lg bg-black/40 border border-border group"
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
                          <div
                            className="flex w-full h-full transition-transform duration-500 ease-out"
                            style={{
                              transform: `translateX(-${activeShot * 100}%)`,
                            }}
                          >
                            {game.screenshots.map(
                              (src, index) => (
                                <img
                                  key={index}
                                  src={src}
                                  alt={`${game.title} screenshot ${index + 1}`}
                                  className="w-full h-full object-cover flex-shrink-0"
                                />
                              ),
                            )}
                          </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {game.screenshots.map((src, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveShot(i)}
                              className={`flex-shrink-0 w-20 h-14 overflow-hidden border transition-all cursor-pointer ${
                                activeShot === i
                                  ? "border-primary"
                                  : "border-border opacity-50 hover:opacity-80"
                              }`}
                            >
                              <img
                                src={src}
                                alt={`Thumb ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* System requirements */}
                  {game.systemRequirements && (
                    <div>
                      <p
                        className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3 border-b border-border pb-2"
                        style={{
                          fontFamily:
                            "'JetBrains Mono', monospace",
                        }}
                      >
                        ∕∕ Requisitos de Sistema
                      </p>

                      <div className="border border-border divide-y divide-border">
                        {sysReqRows.map(
                          ({ key, label, icon }) =>
                            game.systemRequirements?.[key] ? (
                              <div
                                key={key}
                                className="grid grid-cols-[auto_1fr] gap-3 px-3 py-2.5 hover:bg-secondary/30 transition-colors"
                              >
                                <div className="flex items-center gap-2 text-muted-foreground w-40">
                                  <span className="text-primary/50 flex-shrink-0">
                                    {icon}
                                  </span>
                                  <span
                                    className="text-[10px] tracking-wide leading-tight"
                                    style={{
                                      fontFamily:
                                        "'JetBrains Mono', monospace",
                                    }}
                                  >
                                    {label}
                                  </span>
                                </div>
                                <span className="text-xs text-foreground/80 self-center">
                                  {game.systemRequirements[key]}
                                </span>
                              </div>
                            ) : null,
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
