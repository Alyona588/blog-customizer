import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, SyntheticEvent, useRef } from 'react';
import {
	defaultArticleState,
	backgroundColors,
	OptionType,
	fontColors,
	fontSizeOptions,
	fontFamilyOptions,
	contentWidthArr,
} from '../../constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';

type ArticleParamsFormProps = {
	articleState: typeof defaultArticleState;
	setArticleState: (param: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedArticleState, setSelectedArticleState] =
		useState(articleState);
	const rootRef = useRef<HTMLDivElement | null>(null);

	const handleArticleState = (e: SyntheticEvent) => {
		e.preventDefault();
		setArticleState(selectedArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: () => console.log('Меню было закрыто'),
	});

	const resetNewState = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClose={setIsOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<div ref={rootRef}>
					<form className={styles.form} onSubmit={handleArticleState}>
						<h2 className={styles.title}>Задайте параметры</h2>
						<h4 className={styles.subtitle}>Шрифт</h4>
						<Select
							selected={selectedArticleState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(selectedElement: OptionType) => {
								setSelectedArticleState((lastState) => ({
									...lastState,
									fontFamilyOption: selectedElement,
								}));
							}}
						/>

						<RadioGroup
							selected={selectedArticleState.fontSizeOption}
							options={fontSizeOptions}
							onChange={(selectedElement: OptionType) => {
								setSelectedArticleState((lastState) => ({
									...lastState,
									fontSizeOption: selectedElement,
								}));
							}}
							name='fontSize'
							title='Размер шрифта'
						/>
						<h4 className={styles.subtitle}>Цвет шрифта</h4>
						<Select
							selected={selectedArticleState.fontColor}
							options={fontColors}
							onChange={(selectedElement: OptionType) => {
								setSelectedArticleState((lastState) => ({
									...lastState,
									fontColor: selectedElement,
								}));
							}}
						/>
						<div className={styles.divider} />
						<h4 className={styles.subtitle}>Цвет фона</h4>
						<Select
							selected={selectedArticleState.backgroundColor}
							options={backgroundColors}
							onChange={(selectedElement: OptionType) => {
								setSelectedArticleState((lastState) => ({
									...lastState,
									backgroundColor: selectedElement,
								}));
							}}
						/>
						<h4 className={styles.subtitle}>Ширина контента</h4>
						<Select
							selected={selectedArticleState.contentWidth}
							options={contentWidthArr}
							onChange={(selectedElement: OptionType) => {
								setSelectedArticleState((lastState) => ({
									...lastState,
									contentWidth: selectedElement,
								}));
							}}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={resetNewState} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</div>
			</aside>
		</>
	);
};
