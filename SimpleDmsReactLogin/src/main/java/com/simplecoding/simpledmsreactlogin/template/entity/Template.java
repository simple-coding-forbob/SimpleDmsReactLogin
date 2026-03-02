package com.simplecoding.simpledmsreactlogin.template.entity;

import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TB_TEMPLATE")
@SequenceGenerator(
        name = "SQ_TEMPLATE_JPA",
        sequenceName = "SQ_TEMPLATE",
        initialValue = 1,
        allocationSize = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "tid", callSuper = false)
public class Template extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_TEMPLATE_JPA")
    private Long tid;
    private String title;
    private String fileName;
    private String content;
}
