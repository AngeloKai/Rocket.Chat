import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Box, Button, Select, Field, FieldGroup } from '@rocket.chat/fuselage';
import { useMutableCallback } from '@rocket.chat/fuselage-hooks';

import Page from '../../components/basic/Page';
import ChatsChart from './charts/ChatsChart';
import ChatsPerAgentChart from './charts/ChatsPerAgentChart';
import AgentStatusChart from './charts/AgentStatusChart';
import ChatsPerDepartmentChart from './charts/ChatsPerDepartmentChart';
import ChatDurationChart from './charts/ChatDurationChart';
import ResponseTimesChart from './charts/ResponseTimesChart';
import { getDateRange } from '../../helpers/getDateRange';
import { useTranslation } from '../../contexts/TranslationContext';

const dateRange = getDateRange();

const RealTimeMonitoringPage = () => {
	const t = useTranslation();

	const [reloadFrequency, setReloadFrequency] = useState(5);

	const reloadRef = useRef({});
	const params = useMemo(() => ({
		...dateRange,
	}), []);

	const chartProps = useMemo(() => ({
		reloadRef,
		params,
	}), [params]);

	const reloadCharts = useMutableCallback(() => {
		Object.values(reloadRef.current).forEach((reload) => {
			reload();
		});
	});

	useEffect(() => {
		const interval = setInterval(reloadCharts, reloadFrequency * 1000);
		return () => {
			clearInterval(interval);
		};
	}, [reloadCharts, reloadFrequency]);

	const reloadOptions = useMemo(() => [
		[5, <>5 {t('seconds')}</>],
		[10, <>10 {t('seconds')}</>],
		[30, <>30 {t('seconds')}</>],
		[60, <>1 {t('minute')}</>],
	], [t]);

	return <Page>
		<Page.Header title={t('Real_Time_Monitoring')}>
		</Page.Header>
		<Page.ScrollableContentWithShadow>
			<Box display='flex' maxWidth='x600' alignSelf='center' w='full'>
				<FieldGroup flexGrow={1}>
					<Field>
						<Field.Label>{t('Update_every')}</Field.Label>
						<Field.Row>
							<Select options={reloadOptions} onChange={useMutableCallback((val) => setReloadFrequency(val))} value={reloadFrequency}/>
						</Field.Row>
					</Field>
					<Field>
						<Field.Label>{t('Department')}</Field.Label>
						<Field.Row>
							<Select options={reloadOptions} onChange={useMutableCallback((val) => setReloadFrequency(val))} value={reloadFrequency}/>
						</Field.Row>
					</Field>
				</FieldGroup>
			</Box>
			<Box display='flex' flexDirection='row' w='full' alignItems='stretch' flexShrink={1}>
				<ChatsChart mie='x2' flexShrink={1} flexGrow={1} flexBasis='auto' {...chartProps}/>
				<ChatsPerAgentChart mis='x2' flexShrink={1} flexGrow={3} flexBasis='auto' {...chartProps}/>
			</Box>
			<Box display='flex' flexDirection='row' w='full' alignItems='stretch' flexShrink={1}>
				<AgentStatusChart mie='x2' flexShrink={1} flexGrow={1} {...chartProps}/>
				<ChatsPerDepartmentChart mis='x2' flexShrink={1} flexGrow={3} {...chartProps}/>
			</Box>
			<Box display='flex' w='full' flexShrink={1}>
				<ChatDurationChart flexGrow={1} flexShrink={1} {...chartProps}/>
			</Box>
			<Box display='flex' w='full' flexShrink={1}>
				<ResponseTimesChart flexGrow={1} flexShrink={1} {...chartProps}/>
			</Box>
		</Page.ScrollableContentWithShadow>
	</Page>;
};

export default RealTimeMonitoringPage;
