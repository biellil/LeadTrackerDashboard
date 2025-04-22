import styled from "styled-components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart2, 
  Bot, 
  Target, 
  AlertTriangle, 
  Clock, 
  LineChart, 
  BanknoteIcon
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from "recharts";

const PanelContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PanelCard = styled(Card)`
  background-color: hsl(var(--dark-panel));
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const PanelHeader = styled(CardHeader)`
  padding: 1.5rem;
  padding-bottom: 0;
`;

const PanelTitle = styled(CardTitle)`
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconWrapper = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

const PanelContent = styled(CardContent)`
  padding: 1.5rem;
  height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LegendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const LegendColor = styled.span<{ color: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 0.5rem;
`;

const LegendLabel = styled.span`
  font-size: 0.875rem;
`;

const ProgressContainer = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ProgressLabel = styled.span`
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

const ProgressValue = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  background-color: hsl(var(--muted));
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $width: string; $gradient: string }>`
  height: 100%;
  width: ${({ $width }) => $width};
  background: ${({ $gradient }) => $gradient};
`;

const ChallengeCard = styled.div`
  padding: 1rem;
  background-color: hsl(var(--muted));
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--border));
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ChallengeHeader = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ChallengeIconWrapper = styled.span<{ color: string; bgColor: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
`;

const ChallengeInfo = styled.div``;

const ChallengeName = styled.h4`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ChallengeValue = styled.p`
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

interface SegmentoEmpresa {
  name: string;
  value: number;
  color: string;
}

interface IAMetric {
  name: string;
  value: number;
  gradient: string;
}

interface Challenge {
  name: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface DetailPanelProps {
  segmentos: SegmentoEmpresa[];
  iaMetrics: IAMetric[];
  challenges: Challenge[];
}

const DetailPanel = ({ segmentos, iaMetrics, challenges }: DetailPanelProps) => {
  return (
    <PanelContainer>
      {/* Segmentos de Empresas */}
      <PanelCard>
        <PanelHeader>
          <PanelTitle>
            <IconWrapper $color="hsl(var(--neon-blue))">
              <BarChart2 size={20} />
            </IconWrapper>
            Segmentos de Empresas
          </PanelTitle>
        </PanelHeader>
        <PanelContent>
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentos}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {segmentos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentagem']}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </PanelContent>
        <CardContent>
          <LegendGrid>
            {segmentos.map((segment, index) => (
              <LegendItem key={index}>
                <LegendColor color={segment.color} />
                <LegendLabel>{segment.name}</LegendLabel>
              </LegendItem>
            ))}
          </LegendGrid>
        </CardContent>
      </PanelCard>

      {/* Experiência com IA */}
      <PanelCard>
        <PanelHeader>
          <PanelTitle>
            <IconWrapper $color="hsl(var(--neon-purple))">
              <Bot size={20} />
            </IconWrapper>
            Experiência com IA
          </PanelTitle>
        </PanelHeader>
        <PanelContent className="flex-col">
          {iaMetrics.map((metric, index) => (
            <ProgressContainer key={index}>
              <ProgressHeader>
                <ProgressLabel>{metric.name}</ProgressLabel>
                <ProgressValue>{metric.value}%</ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill $width={`${metric.value}%`} $gradient={metric.gradient} />
              </ProgressBar>
            </ProgressContainer>
          ))}
        </PanelContent>
      </PanelCard>

      {/* Principais Desafios */}
      <PanelCard>
        <PanelHeader>
          <PanelTitle>
            <IconWrapper $color="hsl(var(--neon-green))">
              <Target size={20} />
            </IconWrapper>
            Principais Desafios
          </PanelTitle>
        </PanelHeader>
        <PanelContent className="flex-col">
          {challenges.map((challenge, index) => (
            <ChallengeCard key={index}>
              <ChallengeHeader>
                <ChallengeIconWrapper color={challenge.color} bgColor={challenge.bgColor}>
                  {challenge.icon}
                </ChallengeIconWrapper>
                <ChallengeInfo>
                  <ChallengeName>{challenge.name}</ChallengeName>
                  <ChallengeValue>{challenge.value}</ChallengeValue>
                </ChallengeInfo>
              </ChallengeHeader>
            </ChallengeCard>
          ))}
        </PanelContent>
      </PanelCard>
    </PanelContainer>
  );
};

export default DetailPanel;